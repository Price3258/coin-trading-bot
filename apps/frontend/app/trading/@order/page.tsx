"use client";

import { postPlaceOrder } from "~/apis/trading";
import { OrderRequest } from "~/types/trading";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const OrderPage = () => {
  const [market, setMarket] = useState("KRW-BTC");
  const [side, setSide] = useState<"bid" | "ask">("bid");
  const [volume, setVolume] = useState("");
  const [price, setPrice] = useState("");
  const [ordType, setOrdType] = useState<"limit" | "market" | "price">("price");

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (order: OrderRequest) => postPlaceOrder(order),
  });

  const handleOrder = () => {
    mutate({ market, side, volume, price, ord_type: ordType });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">📈 매매 주문</h1>

        <div className="flex flex-col gap-3">
          <label className="font-medium text-gray-800">거래 마켓:</label>
          <select
            className="rounded-lg border p-3 text-gray-800"
            value={market}
            onChange={(e) => setMarket(e.target.value as "KRW-BTC" | "KRW-ETH")}
          >
            <option value="KRW-BTC">비트코인</option>
            <option value="KRW-ETH">이더리움</option>
          </select>

          <label className="font-medium text-gray-800">매수/매도:</label>
          <select
            className="rounded-lg border p-3 text-gray-800"
            value={side}
            onChange={(e) => setSide(e.target.value as "bid" | "ask")}
          >
            <option value="bid">🟢 매수</option>
            <option value="ask">🔴 매도</option>
          </select>

          <label className="font-medium text-gray-800">주문 유형:</label>
          <select
            className="rounded-lg border p-3 text-gray-800"
            value={ordType}
            onChange={(e) =>
              setOrdType(e.target.value as "limit" | "market" | "price")
            }
          >
            <option value="market">시장가</option>
            <option value="limit">지정가</option>
          </select>

          {ordType !== "market" && (
            <>
              <label className="font-medium text-gray-800">수량:</label>
              <input
                className="rounded-lg border p-3 text-gray-800"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
              />

              <label className="font-medium text-gray-800">가격:</label>
              <input
                className="rounded-lg border p-3 text-gray-800"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </>
          )}

          <button
            onClick={handleOrder}
            disabled={isPending}
            className={`mt-4 rounded-lg px-4 py-2 text-white ${
              isPending
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isPending ? "주문 처리 중..." : "📩 주문하기"}
          </button>

          {error && (
            <p className="mt-2 text-red-500">🚨 오류 발생: {error.message}</p>
          )}
          {data && (
            <p className="mt-2 text-green-500">✅ 주문 완료! ID: {data.uuid}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
