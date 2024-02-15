import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const LoadingPrice = styled.span`
  display: block;
  text-align: center;
  margin-top: 130px;
`;
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const TopPriceColumn = styled.div`
  width: 100%;
  padding: 30px 20px;
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: space-between;

  h2 {
    display: block;
    font-weight: 600;
    font-size: 18px;
    position: absolute;
    top: 10px;
    right: 43%;
    color: ${(props) => props.theme.accentColor};
    padding-bottom: 20px;
  }
`;
const PriceDate = styled.span`
  margin-top: 15px;
  width: 100px;
`;
const TopPrice = styled.h1`
  font-size: 30px;
  margin-top: 10px;
`;
const PriceDateColumn = styled.div`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  width: 48%;
  h3 {
    font-weight: 600;
    opacity: 0.5;
  }
  span {
    display: block;
    text-align: center;
    font-size: 30px;
    margin-top: 15px;
    svg {
      margin-left: 7px;
    }
  }
`;
interface RouteParams {
  coinId: string;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const renderChange = (percentChange?: number) => {
  const isPositive = percentChange && percentChange >= 0;
  return (
    <span style={{ color: isPositive ? "#00e600" : "#e84118" }}>
      {isPositive ? "+" + percentChange : percentChange}%
      <FontAwesomeIcon icon={isPositive ? faArrowTrendUp : faArrowTrendDown} />
    </span>
  );
};

const Price = () => {
  const { coinId } = useParams<RouteParams>();
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["coinPrice", coinId],
    () => fetchCoinTickers(coinId)
  );

  return (
    <div>
      {priceLoading ? (
        <LoadingPrice>Loading Price...</LoadingPrice>
      ) : (
        <Container>
          <TopPriceColumn>
            <h2>Top Price</h2>
            <PriceDate>
              {priceData?.quotes.USD.ath_date.split("T")[0]} Achieved
            </PriceDate>
            <TopPrice>${priceData?.quotes.USD.ath_price.toFixed(4)}</TopPrice>
          </TopPriceColumn>
          <PriceDateColumn>
            <h3>from 24h ago</h3>
            {renderChange(priceData?.quotes.USD.percent_change_24h)}
          </PriceDateColumn>
          <PriceDateColumn>
            <h3>from 7d ago</h3>
            {renderChange(priceData?.quotes.USD.percent_change_7d)}
          </PriceDateColumn>
          <PriceDateColumn>
            <h3>from 30d ago</h3>
            {renderChange(priceData?.quotes.USD.percent_change_30d)}
          </PriceDateColumn>
          <PriceDateColumn>
            <h3>from 1y ago</h3>
            {renderChange(priceData?.quotes.USD.percent_change_1y)}
          </PriceDateColumn>
        </Container>
      )}
    </div>
  );
};

export default Price;
