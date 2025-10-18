import { browser } from '$app/environment';

import type { Theme, ThemeColor } from './helpers';

const parse = <T>(input: string): T => {
	return JSON.parse(input) as T;
};

const THEME_KEY = 'current_theme';
const EMPTY_THEME = `{ "lightBackground": "#ffffff", "darkBackground": "#000000", "colors": [] }`;

const getInitialTheme = (): Theme => {
	if (!browser) {
		return parse<Theme>(EMPTY_THEME);
	}

	try {
		const stored = localStorage.getItem(THEME_KEY);
		if (!stored) {
			return parse<Theme>(EMPTY_THEME);
		}

		const parsed = parse<Theme>(stored);

		// Validate format
		if (!parsed.lightBackground || !parsed.darkBackground || !Array.isArray(parsed.colors)) {
			localStorage.removeItem(THEME_KEY);
			return parse<Theme>(EMPTY_THEME);
		}

		return parsed;
	} catch (error) {
		console.error('Failed to parse theme from localStorage:', error);
		localStorage.removeItem(THEME_KEY);
		return parse<Theme>(EMPTY_THEME);
	}
};

class ThemeStore {
	#theme = $state<Theme>(getInitialTheme());

	get theme() {
		return this.#theme;
	}

	get lightBackground() {
		return this.#theme.lightBackground;
	}

	set lightBackground(value: string) {
		this.#theme.lightBackground = value;
		this.persist();
	}

	get darkBackground() {
		return this.#theme.darkBackground;
	}

	set darkBackground(value: string) {
		this.#theme.darkBackground = value;
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
