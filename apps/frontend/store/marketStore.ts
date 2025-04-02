import { create } from "zustand";
import { persist } from "zustand/middleware";

type MerketStore = {
  gatheringCoin: { [key: string]: boolean }; // { "KRW-BTC": true, "KRW-ETH": false }
  toggleGathering: (market: string, start: boolean) => void;
  removeGathering: (market: string) => void;
};

export const useMarketStore = create<MerketStore>()(
  persist(
    (set) => ({
      gatheringCoin: {},

      toggleGathering: (market, start) => {
        set((state) => {
          const updatedGatheringCoin = {
            ...state.gatheringCoin,
            [market]: start,
          };
          return { gatheringCoin: updatedGatheringCoin };
        });
      },

      removeGathering: (market) => {
        set((state) => {
          const updatedGatheringCoin = { ...state.gatheringCoin };
          delete updatedGatheringCoin[market];

          return { gatheringCoin: updatedGatheringCoin };
        });
      },
    }),
    { name: "auto-trading-store" }, // localStorage에 자동 저장
  ),
);
