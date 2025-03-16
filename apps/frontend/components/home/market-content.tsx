import { fetchMarketList } from "@/apis/upbit";
import { Market } from "@/types/upbit";

export default async function MarketContent() {
  const res = await fetchMarketList();
  const markets: Market[] = await res.json();

  return (
    <ul>
      {markets
        ?.filter((market) => market.market.startsWith("KRW")) // KRW 마켓만 표시
        .map((market) => (
          <li key={market.market}>
            {market.korean_name} ({market.market})
          </li>
        ))}
    </ul>
  );
}
