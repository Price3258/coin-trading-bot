import { fetchMarketList } from "@/apis/upbit";
import { Market } from "@/types/upbit";

export default async function MarketContent() {
  const res = await fetchMarketList();
  const markets: Market[] = await res.json();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        📈 거래 가능 마켓
      </h1>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {markets
          ?.filter((market) => market.market.startsWith("KRW")) // KRW 마켓만 표시
          .map((market) => (
            <li
              key={market.market}
              className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <p className="text-lg font-semibold">{market.korean_name}</p>
              <p className="text-sm text-gray-600">{market.market}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
