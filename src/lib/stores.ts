import { type Updater, writable } from "svelte/store";

import { browser } from "$app/environment";

import type { Theme, ThemeColor } from "./helpers";

const parse = <T>(input: string): T => {
  return JSON.parse(input) as T;
};

const THEME_KEY = "current_theme";
const EMPTY_THEME = `{ "background": "#ffffff", "colors": [] }`;

const themeStore = () => {
  const stored = browser
    ? parse<Theme>(localStorage.getItem(THEME_KEY) ?? EMPTY_THEME)
    : parse<Theme>(EMPTY_THEME);
  const { update, set, subscribe } = writable(stored);

  return {
    set,
    setName: (name: string) => {
      stored.name = name;
      localStorage.setItem(THEME_KEY, JSON.stringify(stored));
      return set(stored);
    },
    setBackground: (value: string) => {
      stored.background = value;
      localStorage.setItem(THEME_KEY, JSON.stringify(stored));
      return set(stored);
    },
    addColor: (color: ThemeColor) => {
      stored.colors.push(color);
      localStorage.setItem(THEME_KEY, JSON.stringify(stored));
      return set(stored);
    },
    update: (value: Updater<Theme>) => {
      return update((prev) => {
        localStorage.setItem(THEME_KEY, JSON.stringify(value(prev)));
        return value(prev);
      });
    },
    subscribe,
  };
};

export const currentTheme = themeStore();
