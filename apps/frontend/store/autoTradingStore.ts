import { create } from "zustand";

type AutoTradingStore = {
  isAutoTrading: boolean;
  intervalId: NodeJS.Timeout | null;
  toggleAutoTrading: (start: boolean, refetch: () => void) => void;
  stopAutoTrading: () => void;
};

export const useAutoTradingStore = create<AutoTradingStore>((set) => ({
  isAutoTrading: false,
  intervalId: null,

  toggleAutoTrading: (start, refetch) => {
    if (start) {
      // ✅ 자동 매매 시작 (10초마다 refetch 실행)
      const newIntervalId = setInterval(() => {
        refetch();
      }, 10000);
      set({ isAutoTrading: true, intervalId: newIntervalId });
    } else {
      // 🔴 자동 매매 중지
      set((state) => {
        if (state.intervalId) clearInterval(state.intervalId);
        return { isAutoTrading: false, intervalId: null };
      });
    }
  },

  stopAutoTrading: () => {
    set((state) => {
      if (state.intervalId) clearInterval(state.intervalId);
      return { isAutoTrading: false, intervalId: null };
    });
  },
}));
