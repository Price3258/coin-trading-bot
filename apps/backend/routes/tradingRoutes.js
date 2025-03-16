import express from "express";

import { upbitRequest } from "../config/upbit.js";
import {
  calculateMovingAverage,
  calculateRSI,
} from "../utils/technicalIndicators.js";

const router = express.Router();

/**
 * 자동 거래 전략 (RSI + 이동평균) 실행 API
 */

router.get("/strategy/:market", async (req, res, next) => {
  try {
    const { market } = req.params;
    console.log("market");

    /** 업비트 캔들 데이터 가져오기 (최근 100개)
     * docs: https://docs.upbit.com/reference/%EB%B6%84minute-%EC%BA%94%EB%93%A4-1
     */
    const candles = await upbitRequest("/candles/minutes/5", "GET", {
      market,
      count: 100,
    });

    // 가격 데이터 추출
    const prices = candles.map((candle) => candle.trade_price);

    // 이동평균 계산
    const shortMA = calculateMovingAverage(prices, 9);
    const longMA = calculateMovingAverage(prices, 21);

    // RSI 계산
    const rsi = calculateRSI(prices, 14);

    // 현재 가격
    const currentPrice = prices[prices.length - 1];

    // 매매 신호 판별
    let signal = "HOLD";
    if (rsi < 30) {
      signal = "BUY"; // RSI 기준 매수
    }

    if (rsi > 70) {
      signal = "SELL"; // RSI 기준 매도
    }

    if (shortMA[shortMA.length - 1] > longMA[longMA.length - 1]) {
      signal = "BUY"; // 골든크로스
    }

    if (shortMA[shortMA.length - 1] < longMA[longMA.length - 1]) {
      signal = "SELL"; // 데드크로스
    }

    res.json({
      market,
      currentPrice,
      shortMA: shortMA[shortMA.length - 1],
      longMA: longMA[longMA.length - 1],
      rsi,
      signal,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * 자동 매매 주문 실행 API
 * POST /api/trading/order
 * docs: https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0
 */
router.post("/order", async (req, res, next) => {
  try {
    const { market, side, volume, price, ord_type } = req.body;

    if (!market || !side || !ord_type) {
      return res.status(400).json({ error: "필수 파라미터가 없습니다." });
    }

    let orderParams = { market, side, ord_type };

    if (ord_type === "limit") {
      if (!price)
        return res
          .status(400)
          .json({ error: "지정가 주문에는 가격이 필요합니다." });
      if (!volume)
        return res
          .status(400)
          .json({ error: "지정가 주문에는 수량이 필요합니다." });

      orderParams.price = price;
      orderParams.volume = volume;
    } else if (ord_type === "market") {
      // 시장가 매도 (수량 필요)
      if (side === "ask" && !volume) {
        return res
          .status(400)
          .json({ error: "시장가 매도에는 수량이 필요합니다." });
      }
      if (side === "ask") {
        orderParams.volume = volume;
      }
    } else if (ord_type === "price") {
      // 시장가 매수 (가격 필요)
      if (side === "bid" && !price) {
        return res
          .status(400)
          .json({ error: "시장가 매수에는 가격이 필요합니다." });
      }
      if (side === "bid") {
        orderParams.price = price;
      }
    } else {
      return res.status(400).json({ error: "올바르지 않은 ord_type입니다." });
    }

    const response = await upbitRequest("/orders", "POST", orderParams);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * 주문 내역 조회 API
 * GET /api/trading/orders/closed
 */
router.get("/orders/closed", async (req, res, next) => {
  try {
    const response = await upbitRequest("/orders/closed", "GET");
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * ✅ 자동 매매 실행 API
 * GET /api/trading/auto-trade
 */
router.get("/auto-trade", async (req, res, next) => {
  try {
    const accounts = await upbitRequest("/accounts", "GET");
    const btcAccount = accounts.find((acc) => acc.currency === "BTC");

    console.log(accounts);

    if (!btcAccount) {
      return res.status(400).json({ error: "BTC 보유 내역이 없습니다." });
    }

    const avgBuyPrice = parseFloat(btcAccount.avg_buy_price);
    const currentBalance = parseFloat(btcAccount.balance);

    // 📌 1. 현재 시세 조회
    const ticker = await upbitRequest("/ticker", "GET", { markets: "KRW-BTC" });
    const currentPrice = parseFloat(ticker[0].trade_price);

    // 📌 2. 매도 조건 (현재 가격이 평균 매수가 대비 3% 상승하면 매도)
    const sellThreshold = avgBuyPrice * 1.03; // +3% 이익실현
    if (currentPrice >= sellThreshold && currentBalance > 0.0001) {
      const sellOrder = await upbitRequest("/orders", "POST", {
        market: "KRW-BTC",
        side: "ask",
        volume: "0.00001", // ✅ 보유량 일부 매도
        ord_type: "limit",
        price: currentPrice,
      });

      return res.json({
        action: "sell",
        avgBuyPrice,
        currentPrice,
        status: "매도 주문 실행됨",
        orderId: sellOrder.uuid,
      });
    }

    // 📌 3. 매수 조건 (현재 가격이 평균 매수가 대비 5% 하락하면 추가 매수)
    const buyThreshold = avgBuyPrice * 0.95; // -5% 저가 매수
    if (currentPrice <= buyThreshold) {
      const buyOrder = await upbitRequest("/orders", "POST", {
        market: "KRW-BTC",
        side: "bid",
        price: "5000", // 5천원 추가 매수
        ord_type: "price",
      });

      return res.json({
        action: "buy",
        avgBuyPrice,
        currentPrice,
        status: "매수 주문 실행됨",
        orderId: buyOrder.uuid,
      });
    }

    return res.json({
      action: "hold",
      avgBuyPrice,
      currentPrice,
      status: "매매 조건 미충족",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
