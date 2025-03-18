"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Market } from "@/types/upbit";
import { UPBIT_URL } from "@/constants/url";

const fetchMarkets = async (): Promise<Market[]> => {
  const res = await fetch(`${UPBIT_URL}/market/all`);
  if (!res.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
  return res.json();
};

export default function MarketContent() {
  const {
    data: markets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["markets"],
    queryFn: fetchMarkets,
  });

  if (isLoading) return <p>📡 데이터 불러오는 중...</p>;
  if (error) return <p>❌ 데이터 로딩 실패: {error.message}</p>;

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        📈 거래 가능 마켓
      </h1>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {markets
          ?.filter((market) => market.market.startsWith("KRW"))
          .map((market) => (
            <li key={market.market}>
              <Link
                href={`/market/${market.market}`}
                className="block cursor-pointer rounded-lg bg-gray-100 p-4 shadow transition hover:bg-gray-200"
              >
                <p className="text-lg font-semibold text-gray-600">
                  {market.korean_name}
                </p>
                <p className="text-sm text-gray-700">{market.market}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
