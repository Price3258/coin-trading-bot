import { ClosedOrder } from "~/types/order";
import React from "react";

type Props = {
  orders: ClosedOrder[];
};

export default function OrderListContent({ orders }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full rounded-lg border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr className="text-gray-800">
            <th className="border p-3">거래 마켓</th>
            <th className="border p-3">주문 유형</th>
            <th className="border p-3">수량</th>
            <th className="border p-3">가격</th>
            <th className="border p-3">주문 시간</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                ⏳ 주문 내역이 없습니다.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order.uuid}
                className="border-b transition hover:bg-gray-50"
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
  );
}
