import ModalBackdrop from "@/components/modal/modal-backdrop";
import ModalCloseButton from "@/components/modal/modal-close-button";

export default async function MarketModal({
  params,
}: {
  params: { marketId: string };
}) {
  const { marketId } = await params;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <ModalBackdrop />
      <div className="relative z-50 w-full max-w-lg rounded-md bg-white p-8 shadow-lg">
        <ModalCloseButton />
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          📈 {marketId} 상세 정보
        </h2>
        <p className="text-gray-600">add information</p>
      </div>
    </div>
  );
}
