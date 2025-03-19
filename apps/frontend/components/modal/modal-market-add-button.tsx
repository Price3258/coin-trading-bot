"use client";

import { useRouter } from "next/navigation";

import { useAutoTradingStore } from "~/store/autoTradingStore";

type Props = {
  marketId: string;
};

export default function ModalMarketAddButton({ marketId }: Props) {
  const { toggleAutoTrading } = useAutoTradingStore();

  const router = useRouter();

  const onToggleAutoTradingHandler = () => {
    toggleAutoTrading(marketId, false);
    router.back();
  };

  return (
    <button
      className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={onToggleAutoTradingHandler}
    >
      ➕ 자동 매매 추가
    </button>
  );
}
