import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // 환경 변수 로드

const app = express();
app.use(express.json());
app.use(cors());

// 기본 API 엔드포인트
app.get('/', (req, res) => {
    res.send('✅ 백엔드 서버 실행 중!');
});

// 환경 변수에서 포트 로드 (기본값 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
