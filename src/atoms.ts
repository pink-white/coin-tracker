import { atom } from "recoil";

export const darkAtom = atom({
  key: "isDark",
  default: true,
});

export const candleChartState = atom({
  key: "isCandle",
  default: false,
});
