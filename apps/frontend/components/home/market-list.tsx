"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import { Market } from "~/types/upbit";
import { usePathname } from "next/navigation";

type Props = {
  markets: Market[];
};

export default function MarketList({ markets }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const pathName = usePathname();

  // 디바운스 핸들러 생성 (memoized)
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 300),
    [],
  );

  // 입력값이 바뀔 때 디바운스된 값 설정
  useEffect(() => {
    debouncedSetSearch(search);
  }, [search, debouncedSetSearch]);

  // 필터링은 디바운스된 값 기준
  const filteredMarkets = markets.filter(
    (market) =>
      market.market.startsWith("KRW") &&
      (market.korean_name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase()) ||
        market.market.toLowerCase().includes(debouncedSearch.toLowerCase())),
  );

  return (
    <>
      <input
        type="text"
        placeholder="코인 이름이나 마켓 코드 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-md border border-gray-300 p-2 focus:border-blue-400 focus:outline-none"
      />

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {filteredMarkets.map((market) => (
          <li key={market.market}>
            <Link
              href={{
                pathname: `/market/${market.market}`,
                query: { from: pathName },
              }}
              className="block cursor-pointer rounded-lg bg-gray-100 p-4 shadow transition hover:bg-gray-200"
            >
              <p className="text-lg font-semibold text-gray-600">
                {market.korean_name}
              </p>
              <p className="text-sm text-gray-700">{market.market}</p>
            </Link>
          </li>
        ))}
      </ul>

      {filteredMarkets.length === 0 && (
        <p className="mt-4 text-center text-gray-500">검색 결과가 없습니다.</p>
      )}
    </>
  );
}
