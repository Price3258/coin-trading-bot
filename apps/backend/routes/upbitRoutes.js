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

export default router;
