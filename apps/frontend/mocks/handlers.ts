import { http, HttpResponse } from "msw";

export const handlers = [
  // ✅ `market/all` API Mock 응답
  http.get(`/api/upbit/market/all`, () => {
    return HttpResponse.json([
      { market: "KRW-BTC", korean_name: "비트코인" },
      { market: "KRW-ETH", korean_name: "이더리움" },
      { market: "KRW-XRP", korean_name: "리플" },
    ]);
  }),
];
