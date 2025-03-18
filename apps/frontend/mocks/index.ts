const disableMSW = process.env.NEXT_PUBLIC_DISABLE_MSW === "false";

export const initMockAPI = async (): Promise<void> => {
  console.log("started mock worker");
  if (typeof window !== "undefined" && !disableMSW) {
    const { worker } = await import("./browser");
    await worker.start({ onUnhandledRequest: "bypass" });
  }
};
