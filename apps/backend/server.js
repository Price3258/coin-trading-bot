import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import upbitRoutes from "./routes/upbitRoutes.js";

dotenv.config(); // 환경 변수 로드

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트엔드 도메인만 허용
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 기본 API 엔드포인트
app.get("/", (req, res) => {
  res.send("✅ 백엔드 서버 실행 중!");
});

app.use("/api/upbit", upbitRoutes);

// 환경 변수에서 포트 로드 (기본값 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
