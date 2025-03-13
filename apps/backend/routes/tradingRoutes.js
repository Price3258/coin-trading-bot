import express from "express";
import { upbitRequest } from "../config/upbit";
import { calculateMovingAverage } from "../utils/technicalIndicators";

const router = express.Router();

/**
 * 자동 거래 전략 (RSI + 이동평균) 실행 API
 */

router.get("/strategy/:market", async (req, res, next) => {
  try {
    const { market } = req.params;

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
    next.error();
  }
});
