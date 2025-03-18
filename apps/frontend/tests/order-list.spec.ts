import { expect, test } from "@playwright/test";

test.describe("주문 내역 테스트", () => {
  test("주문 내역 진입", async ({ page }) => {
    // ✅ 페이지 이동
    await page.goto("/order-list");
    await expect(page.getByText("📜 주문 내역")).toBeVisible();
  });
});
