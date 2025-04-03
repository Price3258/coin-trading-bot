import express from "express";

import { authenticateJWT } from "../middleware/auth.js";
import Gathering from "../models/gathering.js";

const router = express.Router();

// 모든 라우트에 인증 미들웨어 적용
router.use(authenticateJWT);

// 현재 유저의 모으는 코인 목록 조회
router.get("/", async (req, res) => {
  const userId = req.user._id;
  try {
    const coins = await Gathering.find({ user: userId });
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 코인 모으기 시작 또는 업데이트
router.post("/", async (req, res) => {
  const userId = req.user._id;
  const { market, start } = req.body;

  if (!market || typeof start !== "boolean") {
    return res.status(400).json({ error: "잘못된 요청 데이터" });
  }

  try {
    const result = await Gathering.findOneAndUpdate(
      { user: userId, market },
      { user: userId, market, start },
      { upsert: true, new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 특정 코인 모으기 중지
router.delete("/:market", async (req, res) => {
  const userId = req.user._id;
  const { market } = req.params;

  try {
    await Gathering.deleteOne({ user: userId, market });
    res.json({ message: `${market} 모으기 중지됨` });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
