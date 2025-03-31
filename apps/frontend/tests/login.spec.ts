import { test, expect } from "./utils/extendedTest";

test.describe("로그인 기능 테스트", () => {
  test("로그인 성공", async ({ page }) => {
    await page.goto("/auth");

    await page.fill('input[placeholder="이메일"]', "test@example.com");
    await page.fill('input[placeholder="비밀번호"]', "password123");

    await page.click('button:has-text("로그인")');

    const welcomeMessage = await page.textContent("h1");
    expect(welcomeMessage).toContain("거래 가능 마켓");
  });

  test("로그인 실패", async ({ page }) => {
    await page.goto("/auth");

    await page.fill('input[placeholder="이메일"]', "wrong@example.com");
    await page.fill('input[placeholder="비밀번호"]', "wrongpassword");

    await page.click('button:has-text("로그인")');

    const errorMessage = await page.textContent("p.text-red-400");
    expect(errorMessage).toContain("로그인 실패");
  });
});
