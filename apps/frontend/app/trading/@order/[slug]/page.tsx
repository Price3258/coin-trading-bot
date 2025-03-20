"use client";

import { useState, useEffect } from "react";

import OrderListContent from "~/components/order-list/order-list-content";
import { ClosedOrder } from "~/types/order";
import OrderListHeader from "~/components/order-list/order-list-header";
import { BASE_URL } from "~/constants/url";

const OrderListPage = () => {
  const [orders, setOrders] = useState<ClosedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<ClosedOrder[]>([]);
  const [filter, setFilter] = useState<"all" | "bid" | "ask">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // 주문 내역 가져오기
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/trading/orders/closed`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("주문 내역을 불러오는데 실패했습니다.");
        const data: ClosedOrder[] = await res.json();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("🚨 주문 내역 조회 에러:", error);
      }
    };

    fetchOrders();
  }, []);

  // 필터링 및 정렬 적용
  useEffect(() => {
    let updatedOrders = [...orders];

    //  필터 적용 (매수/매도/전체)
    if (filter !== "all") {
      updatedOrders = updatedOrders.filter((order) => order.side === filter);
    }

    //  정렬 적용 (최신순 / 과거순)
    updatedOrders.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(updatedOrders);
  }, [filter, sortOrder, orders]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">📜 주문 내역</h1>
      </header>

      <main className="flex h-full justify-center p-6">
        <div className="h-full w-full max-w-5xl rounded-lg bg-white p-6 shadow-lg">
          <OrderListHeader
            filter={filter}
            setFilter={setFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <OrderListContent orders={filteredOrders} />
        </div>
      </main>
    </div>
  );
};

export default OrderListPage;
