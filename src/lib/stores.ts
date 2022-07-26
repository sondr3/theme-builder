import { type Updater, writable } from "svelte/store";

import { browser } from "$app/env";

const parse = <T>(input: string): T => {
  return JSON.parse(input) as T;
};

const BACKGROUND_KEY = "background";
const backgroundStore = () => {
  const stored = browser ? localStorage.getItem(BACKGROUND_KEY) ?? "#000000" : "#000000";
  const { update, set, subscribe } = writable(stored);

  return {
    set: (value: string) => {
      localStorage.setItem(BACKGROUND_KEY, value);
      return set(value);
    },
    update,
    subscribe,
  };
};

export const background = backgroundStore();

const COLORS_KEY = "colors";
const colorStore = () => {
  const stored = browser ? parse<string[]>(localStorage.getItem(COLORS_KEY) ?? "[]") : [];
  const { set, update, subscribe } = writable(stored);

  return {
    set: (value: string[]) => {
      localStorage.setItem(COLORS_KEY, JSON.stringify(value));
      return set(value);
    },
    update: (value: Updater<string[]>) => {
      return update((prev) => {
        localStorage.setItem(COLORS_KEY, JSON.stringify(value(prev)));
        return value(prev);
      });
    },
    subscribe,
  };
};

export const colors = colorStore();
