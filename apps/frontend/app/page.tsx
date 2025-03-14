"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchMarketList } from "@/apis/upbit";
import { MarketList } from "@/types/upbit";

const HomePage = () => {
  const {
    data: markets,
    isLoading,
    error,
  } = useQuery<MarketList[]>({
    queryKey: ["marketList"],
    queryFn: fetchMarketList,
  });

  if (isLoading) return <p>📊 종목 목록 로딩 중...</p>;
  if (error) return <p>🚨 오류 발생: {error.message}</p>;

  return (
    <div>
      <h1>🚀 거래 가능 종목</h1>
      <ul>
        {markets
          ?.filter((market) => market.market.startsWith("KRW")) // KRW 마켓만 표시
          .map((market) => (
            <li key={market.market}>
              {market.korean_name} ({market.market})
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HomePage;
