import { browser } from '$app/environment';

import type { Theme, ThemeColor } from './helpers';

const parse = <T>(input: string): T => {
	return JSON.parse(input) as T;
};

const THEME_KEY = 'current_theme';
const EMPTY_THEME = `{ "background": "#ffffff", "colors": [] }`;

class ThemeStore {
	#theme = $state<Theme>(
		browser
			? parse<Theme>(localStorage.getItem(THEME_KEY) ?? EMPTY_THEME)
			: parse<Theme>(EMPTY_THEME)
	);

	get theme() {
		return this.#theme;
	}

	get background() {
		return this.#theme.background;
	}

	set background(value: string) {
		this.#theme.background = value;
		this.persist();
	}

	get colors() {
		return this.#theme.colors;
	}

	get name() {
		return this.#theme.name;
	}

	set name(value: string | undefined) {
		this.#theme.name = value;
		this.persist();
	}

	private persist() {
		if (browser) {
			localStorage.setItem(THEME_KEY, JSON.stringify(this.#theme));
		}
	}

	setName(name: string) {
		this.#theme.name = name;
		this.persist();
	}

	setBackground(value: string) {
		this.#theme.background = value;
		this.persist();
	}

	addColor(color: ThemeColor) {
		this.#theme.colors.push(color);
		this.persist();
	}

	update(updater: (prev: Theme) => Theme) {
		this.#theme = updater(this.#theme);
		this.persist();
	}

	set(value: Theme) {
		this.#theme = value;
		this.persist();
	}
}

export const currentTheme = new ThemeStore();
