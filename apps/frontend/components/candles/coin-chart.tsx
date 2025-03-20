/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useCoinChart } from "~/hooks/useCoinChart";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
);

type CoinChartProps = {
  marketId: string;
};

const CoinChart = ({ marketId }: CoinChartProps) => {
  const { data, isLoading, error } = useCoinChart(marketId);

  if (isLoading) return <p>📊 차트 로딩 중...</p>;
  if (error) return <p>❌ 차트 데이터를 불러오지 못했습니다.</p>;

  // 차트 데이터 변환
  const chartData = {
    labels: data.map((item: any) =>
      new Date(item.timestamp).toLocaleTimeString(),
    ), // 시간 라벨
    datasets: [
      {
        label: `${marketId} 가격`,
        data: data.map((item: any) => item.trade_price), // 거래 가격
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-full max-w-lg p-4">
      <h2 className="mb-2 text-lg font-bold">{marketId} 가격 차트</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CoinChart;
