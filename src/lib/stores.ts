import { hex } from "a11y-color-contrast";
import { writable } from "svelte/store";

export const background = writable(hex("#000000"));
