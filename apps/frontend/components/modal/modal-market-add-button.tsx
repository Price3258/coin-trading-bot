"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BASE_URL } from "~/constants/url";

import { useAutoTradingStore } from "~/store/autoTradingStore";

type Props = {
  marketId: string;
};

export default function ModalMarketAddButton({ marketId }: Props) {
  const { toggleAutoTrading } = useAutoTradingStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const isPathNameHome = searchParams.get("from") === "/";

  const onToggleAutoTradingHandler = () => {
    toggleAutoTrading(marketId, false);
    router.back();
  };

  const onToggleAddGatheringHandler = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/gathering`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ market: marketId, start: true }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "모으기 실패");
      }

      router.back();
    } catch (error) {
      console.error("모으기 실패:", error);
    }
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
      {isPathNameHome ? " 자동 매매 추가" : "코인 모으기"}
    </button>
  );
}
