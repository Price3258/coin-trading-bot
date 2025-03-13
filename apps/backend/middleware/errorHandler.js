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
  console.error("🚨 서버 에러 발생:", err.message);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || "서버에서 알 수 없는 오류가 발생했습니다.",
  });
};
