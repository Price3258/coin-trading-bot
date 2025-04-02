"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useAutoTradingStore } from "~/store/autoTradingStore";
import { useMarketStore } from "~/store/marketStore";

type Props = {
  marketId: string;
};

export default function ModalMarketAddButton({ marketId }: Props) {
  const { toggleAutoTrading } = useAutoTradingStore();
  const { toggleGathering } = useMarketStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const isPathNameHome = searchParams.get("from") === "/";

  const onToggleAutoTradingHandler = () => {
    toggleAutoTrading(marketId, false);
    router.back();
  };

  const onToggleAddGatheringHandler = () => {
    toggleGathering(marketId, false);
    router.back();
  };

  return (
    <button
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={
        isPathNameHome
          ? onToggleAutoTradingHandler
          : onToggleAddGatheringHandler
      }
    >
      ➕ 자동 매매 추가
    </button>
  );
}
