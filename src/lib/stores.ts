import { writable } from "svelte/store";

export const background = writable("#000000");

export const colors = writable<string[]>([]);
