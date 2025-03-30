import dynamic from "next/dynamic";

import ModalBackdrop from "~/components/modal/modal-backdrop";
import ModalCloseButton from "~/components/modal/modal-close-button";
import ModalMarketAddButton from "~/components/modal/modal-market-add-button";

const Chart = dynamic(() => import("~/components/candles/coin-chart"), {
  loading: () => <p>Loading...</p>,
});

export default async function MarketModal({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const marketId = (await params).marketId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalBackdrop />
      <div className="relative z-50 max-h-[90vh] min-h-[600px] w-full max-w-2xl min-w-[600px] overflow-y-auto rounded-lg bg-white p-20 shadow-xl">
        <ModalCloseButton />
        <h2 className="mb-6 p-[10px] text-2xl font-bold text-gray-900">
          📈 {marketId} 상세 정보
        </h2>
        <p className="mb-6 text-gray-700">
          해당 코인의 실시간 가격 변동을 확인하세요.
        </p>
        <div className="h-[400px] w-full">
          {marketId ? <Chart marketId={marketId} /> : <p>데이터가 없습니다.</p>}
        </div>
        <ModalMarketAddButton marketId={marketId} />
      </div>
    </div>
  );
}
