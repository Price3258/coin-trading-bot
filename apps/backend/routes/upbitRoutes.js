import express from "express";
import axios from "axios";

import { upbitRequest } from "../config/upbit.js";
import { UPBIT_CANDLE_API } from "../constants/url.js";

const router = express.Router();

/**
 * 내 계좌 정보 조회
 */
router.get("/accounts", async (req, res) => {
  try {
    const data = await upbitRequest("/accounts", "GET");
    console.log("/acounts");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "계좌 조회 실패" });
  }
});

/**
 * 특정 코인의 현재 가격 조회 (시세 조회)
 */
router.get("/ticker/:market", async (req, res) => {
  try {
    const { market } = req.params;
    const data = await upbitRequest("/ticker", "GET", { markets: market });
    if (!data || data.length === 0) {
      const error = new Error(`❌ ${market}는 존재하지 않는 시장입니다.`);
      error.status = 404; // ✅ 커스텀 HTTP 상태 코드
      throw error;
    }
    res.json(data[0]);
  } catch (error) {
    console.log("시세 조회 실패: ", error);
    res.status(500).json({ error: "시세 조회 실패" });
  }
});

/**
 * 거래 가능한 코인 목록 조회
 */
router.get("/market/all", async (req, res) => {
  try {
    const data = await upbitRequest("/market/all", "GET");
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "거래 가능한 코인 목록 조회 실패" });
  }
});

// ✅ 업비트 캔들 데이터 프록시 API
router.get("/candles/:market", async (req, res) => {
  try {
    const { market } = req.params;
    const response = await axios.get(
      `${UPBIT_CANDLE_API}?market=${market}&count=50`
    );
    res.json(response.data);
  } catch (error) {
    console.error("업비트 차트 데이터 가져오기 오류:", error);
    res.status(500).json({ error: "업비트 차트 데이터를 가져올 수 없습니다." });
  }
});

export default router;
