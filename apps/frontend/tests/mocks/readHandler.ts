import { Market } from "@/types/upbit";
import { delay, http, HttpResponse } from "msw";

const mockMarketAll: Market = {
  market: "KRW-BTC",
  korean_name: "비트코인",
  english_name: "BTC",
};

export const readHandlers = [
  http.get(`http://localhost:5001/api/upbit/market/all`, async () => {
    console.log("mocking");
    await delay(250);
    return HttpResponse.json<Market[]>([mockMarketAll]);
  }),
];
