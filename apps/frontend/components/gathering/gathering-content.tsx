"use client";

import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "~/constants/url";
import { Gathering } from "~/types/gathering";
import GatheringItem from "./gathering-item";

export default function GatheringContent() {
  const {
    data: gatheringList,
    isLoading,
    error,
  } = useQuery<Gathering[]>({
    queryKey: ["gathering"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/gathering`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("데이터 로딩 실패");
      return res.json();
    },
  });

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-gray-800">모으기</h1>
      <p className="text-gray-600">매일 자동으로 코인을 모아보세요.</p>

      {isLoading && <p>⏳ 로딩 중...</p>}
      {error && <p className="text-red-500">⚠️ 에러: {error.message}</p>}

      <ul className="mt-4 list-disc pl-5 text-gray-700">
        {gatheringList?.map((item) => (
          <GatheringItem key={item.market} item={item} />
        ))}
      </ul>
    </div>
  );
}
