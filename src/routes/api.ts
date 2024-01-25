const BASE_URL = `https://api.coinpaprika.com/v1`;

export const fetchCoins = async () => {
  const response = await fetch(`${BASE_URL}/coins`);
  const json = await response.json();
  const slicedJson = json.slice(0, 100);
  return slicedJson;
};

export const fetchCoinInfo = async (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
};

export const fetchCoinTickers = async (coinId: string) => {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
};

export const fetchCoinHistory = async (coinId: string) => {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
};
