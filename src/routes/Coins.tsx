import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import ChangeTheme from "../components/ChangeTheme";

const Container = styled.div`
  max-width: 480px;
  padding: 0px 20px;
  margin: 0 auto;
  position: relative;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 600;
  position: relative;
  left: -10px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.boxColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(105%);
    box-shadow: 2px 5px 2px 2px rgba(0, 0, 0, 0.2);
  }

  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
    padding: 20px;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 7px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <ChangeTheme />
      </Header>
      {isLoading ? (
        <Loader />
      ) : (
        <CoinsList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}/chart/line`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
