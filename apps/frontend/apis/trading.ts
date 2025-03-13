import { TRADING_URL } from "@/constants/url";

export const fetchStrategy = async (market: string) => {
  const res = await fetch(`${TRADING_URL}/strategy/${market}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `API 요청 실패: ${res.status}`);
  }

  return res.json();
};
