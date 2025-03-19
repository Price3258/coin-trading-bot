"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchStrategy } from "~/apis/trading";

const StrategyContent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["strategy", "KRW-BTC"],
    queryFn: () => fetchStrategy("KRW-BTC"),
    refetchInterval: 10000, // 10초마다 자동 업데이트
  });

  if (isLoading) return <p>전략 데이터 로딩 중...</p>;
  if (error) return <p>오류 발생: {error.message}</p>;

  return (
    <div>
      <h2>📊 자동거래 전략</h2>
      <p>현재 가격: {data?.currentPrice.toLocaleString()} 원</p>
      <p>단기 이동평균(9): {data?.shortMA.toLocaleString()} 원</p>
      <p>장기 이동평균(21): {data?.longMA.toLocaleString()} 원</p>
      <p>RSI: {data?.rsi.toFixed(2)}</p>
      <h2>🚀 매매 신호: {data?.signal}</h2>
    </div>
  );
};

export default StrategyContent;
