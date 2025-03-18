import { Market } from "@/types/upbit";
import { http, HttpResponse } from "msw";

const mockMarketAll: Market = {
  market: "KRW-BTC",
  korean_name: "비트코인",
  english_name: "BTC",
};

export const readHandlers = [
  http.get(`api/upbit/market/all`, () => {
    console.log("mocking");
    return HttpResponse.json<Market[]>([mockMarketAll]);
  }),
];
