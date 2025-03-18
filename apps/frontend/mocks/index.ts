const disableMSW = process.env.NEXT_PUBLIC_DISABLE_MSW === "false";

export const initMockAPI = async (): Promise<void> => {
  if (typeof window === "undefined") {
    console.log("started mock worker server");

    const { server } = await import("./server");
    server.listen();
  }
  if (typeof window !== "undefined" && !disableMSW) {
    console.log("started mock worker browser");

    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "error" });
  }
};
