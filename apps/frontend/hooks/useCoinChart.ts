import { BASE_URL } from "~/constants/url";
import { useQuery } from "@tanstack/react-query";

export const useCoinChart = (marketId: string) => {
  return useQuery({
    queryKey: ["coinChart", marketId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/upbit/candles/${marketId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch chart data");
      }
      return res.json();
    },
    staleTime: 60000, // 60초 동안 캐싱
  });
};
