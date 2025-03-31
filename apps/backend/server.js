import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import upbitRoutes from "./routes/upbitRoutes.js";
import tradingRoutes from "./routes/tradingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { MONGO_URI } from "./constants/url.js";

dotenv.config(); // 환경 변수 로드

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트엔드 도메인만 허용
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB 연결됨"))
  .catch((err) => console.error("❌ MongoDB 연결 실패", err));

// 기본 API 엔드포인트
app.get("/", (req, res) => {
  res.send("백엔드 서버 실행 중!");
});

app.use("/api/upbit", upbitRoutes);
app.use("/api/trading", tradingRoutes);

app.use("/api/auth", authRoutes);

// 404 및 에러 핸들러는 라우트 **등록 후 마지막에 배치**
app.use(notFoundHandler);
app.use(errorHandler);

// 환경 변수에서 포트 로드 (기본값 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
