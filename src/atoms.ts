import { atom } from "recoil";

export const darkAtom = atom({
  key: "isDark",
  default: true,
});

export const chart = atom({
  key: "isCandleStick",
  default: false,
});
