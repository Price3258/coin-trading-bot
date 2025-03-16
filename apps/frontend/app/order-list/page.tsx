type Order = {
  uuid: string;
  side: "bid" | "ask";
  market: string;
  price: string;
  volume: string;
  ord_type: string;
  created_at: string;
  state: string;
};

const OrderListPage = async () => {
  try {
    const res = await fetch("http://localhost:5001/api/trading/orders", {
      cache: "no-store", // ✅ SSR: 항상 최신 데이터 가져오기
    });
    if (!res.ok) throw new Error("주문 내역을 불러오는데 실패했습니다.");
    const orders: Order[] = await res.json();

    return (
      <div>
        <h1>📜 주문 내역</h1>
        <ul>
          {orders.length === 0 ? (
            <p>⏳ 주문 내역이 없습니다.</p>
          ) : (
            orders.map((order) => (
              <li key={order.uuid}>
                [{order.market}] {order.side === "bid" ? "매수" : "매도"} |{" "}
                {order.ord_type} | {order.volume} 개 | {order.price} 원 |{" "}
                {new Date(order.created_at).toLocaleString()}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("🚨 주문 내역 조회 에러:", error);
    return <p>🚨 주문 내역을 불러오는 중 오류가 발생했습니다.</p>;
  }
};

export default OrderListPage;
