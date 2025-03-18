import { http, HttpResponse } from "msw";
import { BASE_URL } from "@/constants/url";

export const handlers = [
  http.get(`${BASE_URL}/api/trading/orders/closed`, () => {
    return HttpResponse.json([
      {
        id: "order-1",
        market: "KRW-BTC",
        side: "bid",
        volume: 0.01,
        price: 65000000,
        created_at: "2024-03-18T12:00:00Z",
      },
      {
        id: "order-2",
        market: "KRW-ETH",
        side: "ask",
        volume: 0.5,
        price: 4200000,
        created_at: "2024-03-18T13:00:00Z",
      },
    ]);
  }),
];
