import type { Reporter, TestCase, TestResult } from "@playwright/test/reporter";

class MyReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    console.log(
      `${result.status === "passed" ? "✅" : "❌"} ${test.parent.title} > ${test.title}`,
    );
  }
}

export default MyReporter;
