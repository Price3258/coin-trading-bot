export type ClosedOrder = {
  uuid: string;
  side: "bid" | "ask";
  market: string;
  price: string;
  executed_volume: string;
  ord_type: string;
  created_at: string;
  state: string;
};
