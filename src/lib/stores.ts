import { type Color, hex } from "a11y-color-contrast";
import { type Writable, writable } from "svelte/store";

export const background = writable(hex("#000000"));

export interface ColorCalc {
  color: Color;
  wcag: number;
  apca: number;
}

export const colors: Writable<Record<string, ColorCalc>> = writable({});
