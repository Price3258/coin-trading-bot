"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { useAutoTradingStore } from "~/store/autoTradingStore";
import { BASE_URL } from "~/constants/url";

const AutoTrading = ({ market }: { market: string }) => {
  const { autoTradingPairs, toggleAutoTrading, removeAutoTrading } =
    useAutoTradingStore();

  const isAutoTrading = autoTradingPairs[market] || false;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["autoTrading", market],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/api/trading/auto-trade?market=${market}`,
      );
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "자동매매 요청 실패");
      }
      return res.json();
    },
    enabled: isAutoTrading, // 자동매매 활성화 상태일 때만 실행
    refetchInterval: isAutoTrading ? 10000 : false, //  10초마다 자동 실행
  });

  useEffect(() => {
    if (
      isAutoTrading &&
      data &&
      (data.action === "buy" || data.action === "sell")
    ) {
      toggleAutoTrading(market, false);
    }
  }, [data, isAutoTrading, market, toggleAutoTrading]);

  const tradeResultText = (() => {
    if (data?.action === "sell") {
      return "매도";
    }
    if (data?.action === "buy") {
      return "매수";
    }
    return "대기";
  })();

  return (
    <div className="mx-auto mt-3 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {market} 자동 매매
      </h1>

      {/*  자동 매매 토글 버튼 */}
      <button
        className={`rounded-lg px-4 py-2 text-white ${
          isAutoTrading
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => toggleAutoTrading(market, !isAutoTrading)}
      >
        {isAutoTrading ? "자동 매매 중지" : "자동 매매 시작"}
      </button>

      {/* 자동매매 제거 버튼 */}
      {!isAutoTrading && (
        <button
          className="ml-4 rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
          onClick={() => removeAutoTrading(market)}
        >
          자동매매 제거
        </button>
      )}

      {isLoading && <p>자동 매매 신호 확인 중...</p>}
      {isError && (
        <p className="text-red-600">{error?.message || "오류 발생"}</p>
      )}

      {!isAutoTrading &&
        data?.action !== "none" && ( // none 은 서버에서 주지 않지만 임의로 지정
          <p className="mt-2 text-sm text-green-600">
            자동매매를 중단했습니다.
          </p>
        )}

      {data && !isError && (
        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <p className="text-black">
            매매 결과: <strong>{tradeResultText}</strong>
          </p>
          <p className="text-black">
            현재 가격: {data.currentPrice.toLocaleString()} 원
          </p>
          <p className="text-black">
            평균 매수가: {data.avgBuyPrice.toLocaleString()} 원
          </p>
          <p className="text-black">상태: {data.status}</p>
        </div>
      )}
    </div>
  );
};

export default AutoTrading;
