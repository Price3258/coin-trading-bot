"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import OrderListContent from "@/components/order-list/order-list-content";
import { ClosedOrder } from "@/types/order";
import OrderListHeader from "@/components/order-list/order-list-header";
import { fetchOrders } from "@/apis/upbit";

const OrderListPage = () => {
  const [filter, setFilter] = useState<"all" | "bid" | "ask">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<ClosedOrder[]>({
    queryKey: ["closedOrders"],
    queryFn: fetchOrders,
  });

  const filteredOrders = useMemo(() => {
    let updatedOrders = [...orders];

    if (filter !== "all") {
      updatedOrders = updatedOrders.filter((order) => order.side === filter);
    }

    updatedOrders.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return updatedOrders;
  }, [filter, sortOrder, orders]);

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">📡 주문 내역을 불러오는 중...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        ❌ 주문 내역을 불러오는데 실패했습니다.
      </p>
    );
  }

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
