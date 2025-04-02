import GatheringContent from "~/components/gathering/gathering-content";
import MarketContent from "~/components/home/market-content";

export default function GatheringPage() {
  return (
    <div className="flex grid-cols-2 gap-4 bg-white p-6">
      <div className="flex-1">
        <GatheringContent />
      </div>
      <div className="m-3 flex-1">
        <MarketContent />
      </div>
    </div>
  );
}
