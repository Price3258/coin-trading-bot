"use client";

import { useState } from "react";
import { Market } from "~/types/upbit";

import MarketList from "../home/market-list";

type Props = {
  markets: Market[];
};

export default function MarketSSRWrapper({ markets }: Props) {
  const [localMarkets] = useState(markets); // 나중에 검색/필터 조작용

  return <MarketList markets={localMarkets} />;
}
