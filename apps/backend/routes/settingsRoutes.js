import express from "express";

import { authenticateJWT } from "../middleware/auth.js";
import User from "../models/user.js";
import { encrypt, decrypt } from "../utils/encrypt.js";

const router = express.Router();

// 유저 키 조회
router.get("/upbit", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "사용자 없음" });

    res.json({
      accessKey: decrypt(user.upbitAccessKey || ""),
      secretKey: decrypt(user.upbitSecretKey || ""),
    });
  } catch (err) {
    console.error("키 조회 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

// 유저 키 수정
router.patch("/upbit", authenticateJWT, async (req, res) => {
  const { accessKey, secretKey } = req.body;
  try {
    const encryptedAccess = encrypt(accessKey);
    const encryptedSecret = encrypt(secretKey);

    await User.findByIdAndUpdate(req.user.id, {
      upbitAccessKey: encryptedAccess,
      upbitSecretKey: encryptedSecret,
    });

    res.json({ message: "업데이트 완료" });
  } catch (err) {
    console.error("키 업데이트 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
