import express from "express";

import { upbitRequest } from "../config/upbit.js";

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
      return res.status(404).json({ error: "존재하지 않는 시장입니다." });
    }
    res.json(data[0]);
  } catch (error) {
    console.log("시세 조회 실패: ", error);
    res.status(500).json({ error: "시세 조회 실패" });
  }
});

export default router;
