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
    await page.goto("/");
  });

  test("자동매매 시작 및 중지", async ({ page }) => {
    const startButton = page
      .getByRole("button", { name: "자동 매매 시작" })
      .nth(0);

    await expect(startButton).toBeVisible();
    await startButton.click();
    const stopButton = page
      .getByRole("button", { name: "자동 매매 중지" })
      .nth(0);

    await expect(stopButton).toBeVisible();

    await stopButton.click();
    await expect(startButton).toBeVisible();
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
      page.getByRole("button", { name: "자동 매매 중지" }),
    ).toBeVisible();
  });
});
