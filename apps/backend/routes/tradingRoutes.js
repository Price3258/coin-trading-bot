import express from "express";

import { upbitRequest } from "../config/upbit.js";
import {
  calculateMovingAverage,
  calculateRSI,
} from "../utils/technicalIndicators.js";
import { decrypt } from "../utils/encrypt.js";
import User from "../models/user.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateJWT);

const getUserKeys = async (userId) => {
  const user = await User.findById(userId);
  return {
    accessKey: decrypt(user.upbitAccessKey),
    secretKey: decrypt(user.upbitSecretKey),
  };
};

/**
 * 자동 거래 전략 (RSI + 이동평균) 실행 API
 */

router.get("/strategy/:market", async (req, res, next) => {
  try {
    const { market } = req.params;
    console.log("market");

    const { accessKey, secretKey } = await getUserKeys(req.user.id);
    const candles = await upbitRequest(
      "/candles/minutes/5",
      "GET",
      {
        market,
        count: 100,
      },
      accessKey,
      secretKey
    );

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

    const { accessKey, secretKey } = await getUserKeys(req.user.id);
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

    const response = await upbitRequest(
      "/orders",
      "POST",
      orderParams,
      accessKey,
      secretKey
    );
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
    console.log("test");
    const { accessKey, secretKey } = await getUserKeys(req.user.id);

    const response = await upbitRequest(
      "/orders/closed",
      "GET",
      {},
      accessKey,
      secretKey
    );
    res.json(response);
  } catch (error) {
    next(error);
  }
});

/**
 * 자동 매매 실행 API
 * GET /api/trading/auto-trade
 */
router.get("/auto-trade", async (req, res, next) => {
  try {
    const market = req.query.market || "KRW-BTC"; // 기본값: BTC
    const currency = market.split("-")[1]; // BTC, ETH 등 추출

    //  1. 계좌 정보 조회
    const { accessKey, secretKey } = await getUserKeys(req.user.id);
    const accounts = await upbitRequest(
      "/accounts",
      "GET",
      {},
      accessKey,
      secretKey
    );

    const account = accounts.find((acc) => acc.currency === currency);

    if (!account) {
      console.warn(`⚠️ ${currency} 보유 내역 없음 → 최초 매수 실행`);

      const firstBuyOrder = await upbitRequest(
        "/orders",
        "POST",
        {
          market: market,
          side: "bid",
          price: "5000", // 5천원 어치 자동 매수
          ord_type: "price",
        },
        accessKey,
        secretKey
      );

      return res.json({
        market,
        action: "first-buy",
        status: "보유 내역 없음 → 최초 매수 실행",
        orderId: firstBuyOrder.uuid,
      });
    }

    const avgBuyPrice = parseFloat(account.avg_buy_price);
    const currentBalance = parseFloat(account.balance);

    //  2. 현재 시세 조회
    const ticker = await upbitRequest(
      "/ticker",
      "GET",
      { markets: market },
      accessKey,
      secretKey
    );

    if (!ticker || ticker.length === 0) {
      console.error("❌ 시세 조회 실패");
      return res.status(400).json({ error: "시세 조회 실패" });
    }

    const currentPrice = parseFloat(ticker[0].trade_price);

    const minSellVolume = 5000 / currentPrice; // 최소 5천원어치 매도
    const sellVolume =
      currentBalance >= minSellVolume ? minSellVolume : currentBalance;

    //  3. 매도 조건 보유량이 0.0001 이상일 경우 실행.
    const sellThreshold = avgBuyPrice * 1.03;
    if (currentPrice >= sellThreshold && currentBalance > minSellVolume) {
      console.log(`매도 조건 충족: ${currentPrice} >= ${sellThreshold}`);

      const sellOrder = await upbitRequest(
        "/orders",
        "POST",
        {
          market: market,
          side: "ask",
          volume: sellVolume.toFixed(8), // 50% 매도
          ord_type: "market",
        },
        accessKey,
        secretKey
      );

      console.log("매도 주문 완료:", sellOrder);

      return res.json({
        market,
        action: "sell",
        avgBuyPrice,
        currentPrice,
        status: "매도 주문 실행됨",
        orderId: sellOrder.uuid,
      });
    }

    //  4. 매수 조건
    const buyThreshold = avgBuyPrice * 0.95;
    if (currentPrice <= buyThreshold) {
      console.log(`매수 조건 충족: ${currentPrice} <= ${buyThreshold}`);

      const buyOrder = await upbitRequest(
        "/orders",
        "POST",
        {
          market: market,
          side: "bid",
          price: "5000",
          ord_type: "price",
        },
        accessKey,
        secretKey
      );

      console.log("매수 주문 완료:", buyOrder);

      return res.json({
        market,
        action: "buy",
        avgBuyPrice,
        currentPrice,
        status: "매수 주문 실행됨",
        orderId: buyOrder.uuid,
      });
    }

    console.log("⏳ 매매 조건 미충족");

    return res.json({
      market,
      action: "hold",
      avgBuyPrice,
      currentPrice,
      status: "매매 조건 미충족",
    });
  } catch (error) {
    console.error("❌ 서버 오류:", error);
    next(error);
  }
});

export default router;
