import { test, expect } from "./utils/extendedTest";

test.describe("홈페이지 테스트", () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 페이지 이동
    await page.goto("/auth");

    // 로그인 입력
    await page.fill('input[placeholder="이메일"]', "test@example.com");
    await page.fill('input[placeholder="비밀번호"]', "password123");

    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")');
  });

  test("홈페이지 이동", async ({ page }) => {
    // 페이지 이동
    // await page.goto("/");

    // "비트코인"이 페이지에서 보이는지 확인
    // await expect(page.getByText("리플")).toBeVisible();
    await expect(page.getByText("거래 가능 마켓")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "비트코인 KRW-BTC" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "이더리움 KRW-ETH" }),
    ).toBeVisible();
  });
});
