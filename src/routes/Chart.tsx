import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { darkAtom } from "../atoms";

const LoadingChart = styled.span`
  display: block;
  text-align: center;
  margin-top: 130px;
`;

const NoChartData = styled(LoadingChart)`
  font-size: 25px;
`;

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(darkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 300000,
    }
  );
  const isError = !Array.isArray(data);
  return (
    <div>
      {isLoading ? (
        <LoadingChart>Loading charts...</LoadingChart>
      ) : isError ? (
        <NoChartData>Chart Data Not Found</NoChartData>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#4cd137"], stops: [0, 100] },
            },
            colors: ["#00a8ff"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(4)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
