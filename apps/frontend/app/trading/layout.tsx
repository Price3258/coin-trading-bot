import { ReactNode } from "react";

import AccountContent from "~/components/account/account-content";

interface TradingLayoutProps {
  strategy: ReactNode;
  order: ReactNode;
}

export default function TradingLayout({ strategy, order }: TradingLayoutProps) {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <aside
        style={{ flex: 1, borderRight: "1px solid gray", paddingRight: "20px" }}
      >
        {strategy}
        <br />
        <AccountContent />
      </aside>

      <main style={{ flex: 2 }}>{order}</main>
    </div>
  );
}
