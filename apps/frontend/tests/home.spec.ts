import { readHandlers } from "./mocks/readHandler";
import { expect, test } from "./utils/extendedTest";

test.describe("유저는 홈으로 진입할 수 있다.", () => {
  test("홈페이지가 정상적으로 로드되는지 확인", async ({ page, worker }) => {
    console.log("🚀 테스트 시작: worker 확인");

    if (!worker) {
      console.error("❌ worker가 생성되지 않았음");
      throw new Error("worker가 생성되지 않았음");
    }

    console.log("✅ worker가 생성됨, 핸들러 적용 시도");

    try {
      await worker.use(...readHandlers);
      console.log("✅ 핸들러 적용 완료");
    } catch (error) {
      console.error("❌ worker.use() 실행 중 오류 발생:", error);
    }

    console.log("📡 페이지 이동 시작");
    await page.goto("/");
    await expect(page).toHaveTitle(/Coin Bot/);
    console.log("test 완료");
  });
});
