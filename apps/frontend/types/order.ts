export type ClosedOrder = {
  uuid: string;
  side: "bid" | "ask";
  market: string;
  price: string;
  executed_volume: string;
  ord_type: string;
  created_at: string;
  state: string;
  reserved_fee: string;
  remaining_fee: string;
  paid_fee: string;
  locked: string;
  executed_funds: string;
  trades_count: number;
};
