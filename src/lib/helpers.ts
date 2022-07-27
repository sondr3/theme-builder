import { apcaContrastValue, hex, round, wcagContrastValue } from "a11y-color-contrast";

export const calcWcag = (fg: string, bg: string) => {
  return round(wcagContrastValue(hex(fg), hex(bg)));
};

export const calcApca = (fg: string, bg: string) => {
  return round(Math.abs(apcaContrastValue(hex(fg), hex(bg))));
};
