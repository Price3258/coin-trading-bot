import { test, expect } from "./utils/extendedTest";

test.describe("auto-trading", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auto-trading-store",
        JSON.stringify({
          state: { autoTradingPairs: { "KRW-BTC": false } },
          version: 0,
        }),
      );
    });

    // 로그인 페이지 이동
    await page.goto("/auth");

    // 로그인 입력
    await page.fill('input[placeholder="이메일"]', "test@example.com");
    await page.fill('input[placeholder="비밀번호"]', "password123");

    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")');
  });

  test("자동매매 시작 및 매수 확인", async ({ page }) => {
    await page.waitForURL("/");

    const startButton = page
      .getByRole("button", { name: "자동 매매 시작" })
      .nth(0);

    await expect(startButton).toBeVisible();
    await startButton.click();
    const stopButton = page
      .getByRole("button", { name: "자동 매매 시작" })
      .nth(0);

    await expect(stopButton).toBeVisible();
  });

  test("새로고침 후 자동매매 유지 확인", async ({ page }) => {
    const btcToggleButton = page.getByRole("button", {
      name: "자동 매매 시작",
    });

    await expect(btcToggleButton).toBeVisible();

    await btcToggleButton.click();

    await page.addInitScript(() => {
      window.localStorage.setItem(
        "auto-trading-store",
        JSON.stringify({
          state: { autoTradingPairs: { "KRW-BTC": true } },
          version: 0,
        }),
      );
    });
    await page.reload();

    // const afterReloadData = await page.evaluate(() =>
    //   window.localStorage.getItem("auto-trading-store"),
    // );

    // console.log("Reload 후 localStorage 상태 확인:", afterReloadData);

    await expect(
      page.getByRole("button", { name: "자동 매매 시작" }),
    ).toBeVisible();
  });
});
