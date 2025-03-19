"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAccount } from "~/apis/upbit";
import { Account } from "~/types/upbit";

export default function AccountContent() {
  const {
    data: accounts,
    isLoading,
    error,
    refetch,
  } = useQuery<Account[]>({
    queryKey: ["account"],
    queryFn: fetchAccount,
    refetchInterval: 10000, // ✅ 10초마다 최신 데이터 반영
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  return (
    <>
      <button onClick={() => refetch()}>🔄 새로고침</button>
      <ul>
        {accounts?.map((acc, index) => (
          <li key={index}>
            <strong>{acc.currency}</strong>: {acc.balance} (평균 매수가:{" "}
            {acc.avg_buy_price}원)
          </li>
        ))}
      </ul>
    </>
  );
}
