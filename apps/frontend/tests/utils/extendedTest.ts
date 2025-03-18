import { handlers } from "@/mocks/handlers";
import { test as base, expect } from "@playwright/test";
import { http } from "msw";
import type { MockServiceWorker, Config } from "playwright-msw";
import { createWorkerFixture } from "playwright-msw";

const testFactory = (config?: Config) =>
  base.extend<{
    worker: MockServiceWorker;
    http: typeof http;
  }>({
    worker: createWorkerFixture(handlers, config),
    http,
  });

const test = testFactory();

export { testFactory, test, expect };
