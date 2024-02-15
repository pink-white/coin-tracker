import ApexChart from "react-apexcharts";
import { IHistorical } from "../routes/Chart";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../api";
import { darkAtom } from "../atoms";
import { RouteParams } from "../routes/Coin";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const LoadingChart = styled.span`
  display: block;
  text-align: center;
  margin-top: 130px;
`;

const NoChartData = styled(LoadingChart)`
  font-size: 25px;
`;

const Line = () => {
  const { coinId } = useParams<RouteParams>();
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

export default Line;
