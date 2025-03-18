export default async function MarketPage({
  params,
}: {
  params: Promise<{ marketId: string }>;
}) {
  const marketId = (await params).marketId;

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-800">
        📈 {marketId} 상세 정보
      </h2>
    </div>
  );
}
