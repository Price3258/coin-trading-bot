"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTicker } from "@/apis/upbit";

const TickerPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["ticker", "KRW-BTC"],
    queryFn: fetchTicker,
    refetchInterval: 5000, // 5초마다 최신 시세 가져오기
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div>
      <h1>비트코인 현재 가격</h1>
      <p>{data.trade_price.toLocaleString()} 원</p>
    </div>
  );
};

export default TickerPage;
