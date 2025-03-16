import { UPBIT_URL } from "@/constants/url";
import axios from "axios";

/*
계좌 정보 조회(SSR)
*/
export const fetchAccount = async () => {
  const res = await fetch(`${UPBIT_URL}/accounts`, {
    cache: "no-store", // 최신 데이터 유지
  });

  if (!res.ok) {
    throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
  }

  return res.json();
};

export const fetchTicker = async () => {
  const { data } = await axios.get(`${UPBIT_URL}/ticker/KRW-BTC`);

  return data;
};

/**
 * 거래 가능한 코인 목록 조회
 */
export const fetchMarketList = async () => {
  const res = await fetch(`${UPBIT_URL}/market/all`);
  if (!res.ok) {
    throw new Error("종목 목록을 불러오는데 실패했습니다.");
  }
  return res;
};
