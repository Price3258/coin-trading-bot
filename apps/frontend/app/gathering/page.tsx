import MarketContent from "~/components/home/market-content";

export default function GatheringPage() {
  return (
    <div className="flex grid-cols-2 gap-4 bg-white p-6">
      <div className="flex-1">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">모으기</h1>
        <p className="text-gray-600">매일 자동으로 코인을 모아보세요.</p>
      </div>
      <div className="m-3 flex-1">
        <MarketContent />
      </div>
    </div>
  );
}
