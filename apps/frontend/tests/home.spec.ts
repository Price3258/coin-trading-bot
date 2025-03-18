import { readHandlers } from "./mocks/readHandler";
import { test } from "./utils/extendedTest";
import { expect } from "@playwright/test";

test.describe("유저는 홈으로 진입할 수 있다.", () => {
  test("홈페이지가 정상적으로 로드되는지 확인", async ({ page, worker }) => {
    await worker.use(...readHandlers);
    await page.goto("/");
    await expect(page).toHaveTitle(/Coin Bot/);
  });
});
