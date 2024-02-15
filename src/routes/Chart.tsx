import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import Candle from "../components/CandleStick";
import { Link, Route, Switch } from "react-router-dom";
import Line from "../components/LineChart";

const ChartChange = styled.div`
  width: 110px;
  height: 50px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.boxColor};
  display: flex;
  a {
    width: 100%;
    height: 100%;
  }
`;
const ChartIconBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  height: 100%;
  width: 100%;
  position: relative;
  &:hover {
    background-color: ${(props) => props.theme.bgColor};
    div {
      opacity: 1;
      visibility: visible;
    }
  }
  svg {
    font-size: 20px;
    color: ${(props) => props.theme.accentColor};
  }
`;
const ChartName = styled.div`
  width: 55px;
  height: 40px;
  background-color: ${(props) => props.theme.boxColor};
  position: absolute;
  bottom: -45px;
  border-radius: 20px;
  opacity: 0;
  visibility: hidden;
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  transition: 0.2s ease-in-out;
`;

interface ChartProps {
  coinId: string;
}

//* using apex-chart
export interface IHistorical {
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
  return (
    <div>
      <div>
        <ChartChange>
          <Link to={`/${coinId}/chart/line`}>
            <ChartIconBox>
              <FontAwesomeIcon icon={faChartLine} />
              <ChartName>Line</ChartName>
            </ChartIconBox>
          </Link>
          <Link to={`/${coinId}/chart/candle`}>
            <ChartIconBox>
              <FontAwesomeIcon icon={faChartSimple} />
              <ChartName>Candle</ChartName>
            </ChartIconBox>
          </Link>
        </ChartChange>
        <Switch>
          <Route path={`/:coinId/chart/candle`}>
            <Candle />
          </Route>
          <Route path={`/:coinId/chart/line`}>
            <Line />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Chart;
