export type OrderRequest = {
  market: string;
  side: "bid" | "ask";
  volume?: string;
  price?: string;
  ord_type: "limit" | "market" | "price";
};

export type OrderResponse = {
  uuid: string;
  side: string;
  market: string;
  price: string | null;
  volume: string;
  ord_type: string;
};
