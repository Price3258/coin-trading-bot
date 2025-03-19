import MarketContent from "@/components/home/market-content";
import AutoTradingContent from "@/components/order/auto-trading-content";

const HomePage = () => {
  return (
    <div className="flex grid-cols-2 gap-4">
      <div className="flex-1">
        <AutoTradingContent />
      </div>
      <div className="m-3 flex-1">
        <MarketContent />
      </div>
    </div>
  );
};

export default HomePage;
