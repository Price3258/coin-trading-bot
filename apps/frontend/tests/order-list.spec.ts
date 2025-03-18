import { test, expect } from "./utils/extendedTest";

test.describe("주문 내역 테스트", () => {
  test("order-list", async ({ page }) => {
    // ✅ 페이지 이동
    await page.goto("/order-list");

    // ✅ "📜 주문 내역"이 나타날 때까지 기다리기
    await page.waitForSelector("text=📜 주문 내역", { state: "visible" });

    // ✅ 주문 데이터가 Mock 데이터와 일치하는지 확인
    await expect(page.getByText("KRW-BTC")).toBeVisible();
    await expect(page.getByText("65,000,000 원")).toBeVisible();
  });
});
