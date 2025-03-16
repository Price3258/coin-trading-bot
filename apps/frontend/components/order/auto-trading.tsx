"use client";

import { useQuery } from "@tanstack/react-query";
import { useAutoTradingStore } from "@/store/autoTradingStore";
import { BASE_URL } from "@/constants/url";

const AutoTrading = () => {
  const { isAutoTrading, toggleAutoTrading } = useAutoTradingStore();

  console.log(isAutoTrading);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["autoTrading"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/trading/auto-trade`);
      return res.json();
    },
    enabled: false,
  });

  return (
    <div className="mx-auto mt-3 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">🤖 자동 매매</h1>

      {/* 📌 자동 매매 토글 버튼 */}
      <button
        className={`rounded-lg px-4 py-2 text-white ${
          isAutoTrading
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
        onClick={() => toggleAutoTrading(!isAutoTrading, refetch)}
      >
        {isAutoTrading ? "🔴 자동 매매 중지" : "🟢 자동 매매 시작"}
      </button>

      {isLoading && <p>📡 자동 매매 신호 확인 중...</p>}

      {data && (
        <div className="mt-4 rounded-lg bg-gray-100 p-4">
          <p className="text-black">
            📝 매매 결과:{" "}
            <strong>
              {data.action === "sell"
                ? "🔴 매도"
                : data.action === "buy"
                  ? "🟢 매수"
                  : "⏳ 대기"}
            </strong>
          </p>
          <p className="text-black">
            📊 현재 가격: {data.currentPrice.toLocaleString()} 원
          </p>
          <p className="text-black">
            💰 평균 매수가: {data.avgBuyPrice.toLocaleString()} 원
          </p>
          <p className="text-black">📢 상태: {data.status}</p>
        </div>
      )}
    </div>
  );
};

export default AutoTrading;
