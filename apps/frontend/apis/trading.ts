import { TRADING_URL } from "~/constants/url";
import { OrderRequest, OrderResponse } from "~/types/trading";

export const fetchStrategy = async (market: string) => {
  const res = await fetch(`${TRADING_URL}/strategy/${market}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `API 요청 실패: ${res.status}`);
  }

  return res.json();
};

export const postPlaceOrder = async (
  order: OrderRequest,
): Promise<OrderResponse> => {
  const res = await fetch(`${TRADING_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    throw new Error(errorData.error || `API 요청 실패: ${res.status}`);
  }

  return res.json();
};
