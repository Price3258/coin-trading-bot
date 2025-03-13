"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchStrategy } from "@/apis/trading";

const StrategyPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["strategy", "KRW-BTC"],
    queryFn: () => fetchStrategy("KRW-BTC"),
    refetchInterval: 10000, // 10초마다 업데이트
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div>
      <h1>자동거래 전략</h1>
      <p>현재 가격: {data.currentPrice.toLocaleString()} 원</p>
      <p>단기 이동평균(9): {data.shortMA.toLocaleString()} 원</p>
      <p>장기 이동평균(21): {data.longMA.toLocaleString()} 원</p>
      <p>RSI: {data.rsi.toFixed(2)}</p>
      <h2>🚀 매매 신호: {data.signal}</h2>
    </div>
  );
};

export default StrategyPage;
