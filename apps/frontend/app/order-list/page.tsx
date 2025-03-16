"use client";

import { useState, useEffect } from "react";

type Order = {
  uuid: string;
  side: "bid" | "ask";
  market: string;
  price: string;
  volume: string;
  ord_type: string;
  created_at: string;
  state: string;
};

const OrderListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | "bid" | "ask">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // ✅ 주문 내역 가져오기 (클라이언트에서 최신 데이터 유지)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/trading/orders", {
          cache: "no-store", // 최신 데이터 가져오기
        });
        if (!res.ok) throw new Error("주문 내역을 불러오는데 실패했습니다.");
        const data: Order[] = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("🚨 주문 내역 조회 에러:", error);
      }
    };

    fetchOrders();
  }, []);

  // ✅ 필터링 및 정렬 적용
  useEffect(() => {
    let updatedOrders = [...orders];

    // 📌 필터 적용 (매수/매도/전체)
    if (filter !== "all") {
      updatedOrders = updatedOrders.filter((order) => order.side === filter);
    }

    // 📌 정렬 적용 (최신순 / 과거순)
    updatedOrders.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(updatedOrders);
  }, [filter, sortOrder, orders]);

  return (
    <div>
      <h1>📜 주문 내역</h1>

      {/* 📌 필터링 & 정렬 UI */}
      <div style={{ marginBottom: "16px" }}>
        <label>🛒 주문 유형:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "bid" | "ask")}
        >
          <option value="all">전체</option>
          <option value="bid">매수</option>
          <option value="ask">매도</option>
        </select>

        <label>📅 정렬:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">최신순</option>
          <option value="oldest">과거순</option>
        </select>
      </div>

      {/* 📌 주문 내역 목록 */}
      <ul>
        {filteredOrders.length === 0 ? (
          <p>⏳ 주문 내역이 없습니다.</p>
        ) : (
          filteredOrders.map((order) => (
            <li key={order.uuid}>
              [{order.market}] {order.side === "bid" ? "🟢 매수" : "🔴 매도"} |{" "}
              {order.ord_type} | {order.volume} 개 | {order.price} 원 |{" "}
              {new Date(order.created_at).toLocaleString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default OrderListPage;
