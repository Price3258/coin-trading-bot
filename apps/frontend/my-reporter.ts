import type {
  FullResult,
  Reporter,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onTestBegin(test: TestCase) {
    console.log(`🟡 테스트 시작: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(
      `${result.status === "passed" ? "✅" : "❌"} ${test.parent?.title} > ${test.title}`,
    );

    if (result.status === "failed" && result.errors.length > 0) {
      console.error("❌ 테스트 실패 이유:");
      result.errors.forEach((error, index) => {
        console.error(`🚨 [Error ${index + 1}]: ${error.message}`);
      });
    }
  }

  onStdOut(chunk: string | Buffer) {
    console.log(`📝 STDOUT: ${chunk.toString()}`);
  }

  onStdErr(chunk: string | Buffer) {
    console.error(`❌ STDERR: ${chunk.toString()}`);
  }

  onEnd(result: FullResult) {
    console.log(
      `🎉 테스트 완료: ${result.status === "passed" ? "✅ 성공" : "❌ 실패"}`,
    );
  }
}

export default MyReporter;
