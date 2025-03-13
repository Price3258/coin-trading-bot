"use client";

import { postPlaceOrder } from "@/apis/trading";
import { OrderRequest } from "@/types/trading";
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
    <div>
      <h1>자동 매매 주문</h1>

      <label>거래 마켓:</label>
      <input value={market} onChange={(e) => setMarket(e.target.value)} />

      <label>매수/매도:</label>
      <select
        value={side}
        onChange={(e) => setSide(e.target.value as "bid" | "ask")}
      >
        <option value="bid">매수</option>
        <option value="ask">매도</option>
      </select>

      <label>주문 유형:</label>
      <select
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
          <label>수량:</label>
          <input value={volume} onChange={(e) => setVolume(e.target.value)} />

          <label>가격:</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </>
      )}

      <button onClick={handleOrder} disabled={isPending}>
        주문하기
      </button>

      {isPending && <p>주문 처리 중...</p>}
      {error && <p>오류 발생: {error.message}</p>}
      {data && <p>✅ 주문 완료! ID: {data.uuid}</p>}
    </div>
  );
};

export default OrderPage;
