import { create } from "zustand";
import { persist } from "zustand/middleware";

type AutoTradingStore = {
  autoTradingPairs: { [key: string]: boolean }; // { "KRW-BTC": true, "KRW-ETH": false }
  toggleAutoTrading: (market: string, start: boolean) => void;
  removeAutoTrading: (market: string) => void;
};

export const useAutoTradingStore = create<AutoTradingStore>()(
  persist(
    (set) => ({
      autoTradingPairs: {},

      toggleAutoTrading: (market, start) => {
        console.log(`🚀 toggleAutoTrading 실행: ${market}, start=${start}`);

        set((state) => {
          const updatedPairs = { ...state.autoTradingPairs, [market]: start };
          return { autoTradingPairs: updatedPairs };
        });
      },

      removeAutoTrading: (market) => {
        set((state) => {
          const updatedPairs = { ...state.autoTradingPairs };
          delete updatedPairs[market];

          return { autoTradingPairs: updatedPairs };
        });
      },
    }),
    { name: "auto-trading-store" }, // localStorage에 자동 저장
  ),
);
