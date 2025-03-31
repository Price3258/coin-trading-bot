import { http, HttpResponse } from "msw";
import { BASE_URL } from "~/constants/url";

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
  http.get(`${BASE_URL}/api/trading/auto-trade`, () => {
    return HttpResponse.json({
      action: "buy",
      currentPrice: 6500,
      avgBuyPrice: 600,
      status: "매수 주문 실행됨",
    });
  }),
  http.post(`${BASE_URL}/api/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const { email, password } = body;

    if (email === "test@example.com" && password === "password123") {
      return HttpResponse.json({
        user: { email, name: "테스트 유저" },
      });
    }

    return new HttpResponse(
      JSON.stringify({ error: "로그인 실패: 잘못된 자격 증명입니다." }),
      { status: 401 },
    );
  }),
  // 로그인 상태 확인용 /api/user/me
  http.get(`${BASE_URL}/api/user/me`, () => {
    return HttpResponse.json({
      user: { email: "test@example.com", name: "테스트 유저" },
    });
  }),
];
