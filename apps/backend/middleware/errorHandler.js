/**
 * 404 에러 처리 미들웨어
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: "API 엔드포인트를 찾을 수 없습니다." });
};

/**
 * 전역 에러 처리 미들웨어
 */
export const errorHandler = (err, req, res, next) => {
  console.error("🚨 서버 에러 발생:", err);

  const statusCode = err.response?.status || err.status || 500;

  // ✅ 업비트 API 에러 메시지 처리
  const errorMessage =
    err.response?.data?.error?.message || // 업비트 API에서 제공하는 에러 메시지
    err.message || // 일반적인 에러 메시지
    "서버에서 알 수 없는 오류가 발생했습니다.";

  res.status(statusCode).json({ error: errorMessage });
};
