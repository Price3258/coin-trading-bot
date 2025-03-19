"use client";

import { useAutoTradingStore } from "~/store/autoTradingStore";
import AutoTrading from "./auto-trading";

export default function AutoTradingContent() {
  const { autoTradingPairs } = useAutoTradingStore();
  const tradingMarkets = Object.keys(autoTradingPairs);
  const renderContent =
    tradingMarkets.length === 0 ? (
      <p className="text-gray-500">
        추가된 자동매매가 없습니다. 거래 마켓을 선택해주세요.
      </p>
    ) : (
      tradingMarkets.map((market) => (
        <AutoTrading key={market} market={market} />
      ))
    );
  return renderContent;
}
