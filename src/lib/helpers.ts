import {
  apcaContrastValue,
  hex,
  round,
  wcagContrastValue,
} from "a11y-color-contrast";

export interface ThemeColor {
  name: string;
  color: string;
}

export interface Theme {
  name?: string;
  background: string;
  colors: Array<ThemeColor>;
}

export const calcWcag = (fg: string, bg: string) => {
  return round(wcagContrastValue(hex(fg), hex(bg)));
};

export const calcApca = (fg: string, bg: string) => {
  return round(Math.abs(apcaContrastValue(hex(fg), hex(bg))));
};
