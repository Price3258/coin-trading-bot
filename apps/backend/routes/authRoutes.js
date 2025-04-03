import express from "express";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, name, upbitAccessKey, upbitSecretKey } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "이미 가입된 이메일입니다" });
    }

    const hashed = await hash(password, 10);
    const upbitAccessKeyEncrypted = encrypt(upbitAccessKey);
    const upbitSecretKeyEncrypted = encrypt(upbitSecretKey);

    const user = await User.create({
      email,
      password: hashed,
      name,
      upbitAccessKey: upbitAccessKeyEncrypted,
      upbitSecretKey: upbitSecretKeyEncrypted,
    });

    res.status(201).json({
      message: "회원가입 완료",
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "서버 오류",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "이메일 또는 비밀번호가 틀립니다" });

    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "이메일 또는 비밀번호가 틀립니다" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // httpOnly 쿠기로 저장
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
    });

    res.json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "로그아웃 완료" });
});

export default router;
