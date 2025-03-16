type Props = {
  filter: "all" | "bid" | "ask";
  setFilter: (value: "all" | "bid" | "ask") => void;
  sortOrder: "newest" | "oldest";
  setSortOrder: (value: "newest" | "oldest") => void;
};

export default function OrderListHeader({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <label className="font-medium text-gray-700">🛒 주문 유형:</label>
      <select
        className="border p-2 rounded shadow-sm text-gray-800"
        value={filter}
        onChange={(e) => setFilter(e.target.value as "all" | "bid" | "ask")}
      >
        <option value="all">전체</option>
        <option value="bid">매수</option>
        <option value="ask">매도</option>
      </select>

      <label className="font-medium text-gray-700">📅 정렬:</label>
      <select
        className="border p-2 rounded shadow-sm text-gray-800"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
      >
        <option value="newest">최신순</option>
        <option value="oldest">과거순</option>
      </select>
    </div>
  );
}
