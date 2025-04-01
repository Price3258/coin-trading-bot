import { Market } from "~/types/upbit";
import { UPBIT_URL } from "~/constants/url";

import MarketSSRWrapper from "../market/market-ssr-wrapper";

export default async function MarketContent() {
  const res = await fetch(`${UPBIT_URL}/market/all`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    return <p>Error </p>;
  }

  const markets: Market[] = await res.json();

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">거래 가능 마켓</h1>

      <MarketSSRWrapper markets={markets} />
    </div>
  );
}
