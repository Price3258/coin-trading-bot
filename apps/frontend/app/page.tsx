import MarketContent from "@/components/home/market-content";
import AutoTrading from "@/components/order/auto-trading";
import { ReactNode } from "react";

type Props = {
  modal: ReactNode;
};

const HomePage = ({ modal }: Props) => {
  return (
    <div className="flex grid-cols-2 gap-4">
      <div className="flex-1">
        <AutoTrading />
      </div>
      <div className="m-3 flex-1">
        <MarketContent />
        {modal}
      </div>
    </div>
  );
};

export default HomePage;
