"use client";

import { useState, useEffect } from "react";

type Order = {
  uuid: string;
  side: "bid" | "ask";
  market: string;
  price: string;
  executed_volume: string;
  ord_type: string;
  created_at: string;
  state: string;
};

const OrderListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<"all" | "bid" | "ask">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // ✅ 주문 내역 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "http://localhost:5001/api/trading/orders/closed",
          {
            cache: "no-store",
          }
        );
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
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">📜 주문 내역</h1>

      {/* 📌 필터링 & 정렬 UI */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium text-gray-700">🛒 주문 유형:</label>
        <select
          className="border p-2 rounded shadow-sm text-gray-800"
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "bid" | "ask")}
        >
          <option value="all">전체</option>
          <option value="bid">매수</option>
          <option value="ask">매도</option>
        </select>

        <label className="font-medium text-gray-700">📅 정렬:</label>
        <select
          className="border p-2 rounded shadow-sm text-gray-800"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        >
          <option value="newest">최신순</option>
          <option value="oldest">과거순</option>
        </select>
      </div>

      {/* 📌 주문 내역 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-gray-800">
              <th className="p-3 border">거래 마켓</th>
              <th className="p-3 border">주문 유형</th>
              <th className="p-3 border">수량</th>
              <th className="p-3 border">가격</th>
              <th className="p-3 border">주문 시간</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  ⏳ 주문 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.uuid}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-center text-gray-800">
                    {order.market}
                  </td>
                  <td
                    className={`p-3 text-center font-medium ${order.side === "bid" ? "text-green-500" : "text-red-500"}`}
                  >
                    {order.side === "bid" ? "🟢 매수" : "🔴 매도"}
                  </td>
                  <td className="p-3 text-center text-gray-800">
                    {order.executed_volume}
                  </td>
                  <td className="p-3 text-center text-gray-800">
                    {parseFloat(order.price).toLocaleString()} 원
                  </td>
                  <td className="p-3 text-center text-gray-800">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderListPage;
