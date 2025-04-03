import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "로그인 필요" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: "유효하지 않은 토큰" });
  }
});

export default router;
