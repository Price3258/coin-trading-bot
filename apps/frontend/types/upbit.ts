export type Account = {
  currency: string; // 통화 (KRW, BTC, ETH 등)
  balance: string; // 보유 금액
  avg_buy_price: string; // 평균 매수가
};

export type MarketList = {
  market: string;
  korean_name: string;
  english_name: string;
};
