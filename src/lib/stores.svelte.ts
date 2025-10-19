import { browser } from '$app/environment';
import Color from 'colorjs.io';

import type { Theme, ThemeColor } from './helpers';

const parse = <T>(input: string): T => {
	return JSON.parse(input) as T;
};

const THEME_KEY = 'current_theme';
const EMPTY_THEME: Theme = {
	lightBackground: new Color({ spaceId: 'oklch', coords: [1, 0, 180], alpha: 1 }),
	darkBackground: new Color({ spaceId: 'oklch', coords: [0, 0, 180], alpha: 1 }),
	colors: []
};

const getInitialTheme = (): Theme => {
	if (!browser) {
		return EMPTY_THEME;
	}

	try {
		const stored = localStorage.getItem(THEME_KEY);
		if (!stored) {
			return EMPTY_THEME;
		}

		const parsed = parse<Theme>(stored);

		// Validate format
		if (!parsed.lightBackground || !parsed.darkBackground || !Array.isArray(parsed.colors)) {
			localStorage.removeItem(THEME_KEY);
			return EMPTY_THEME;
		}

		parsed.darkBackground = new Color(parsed.darkBackground);
		parsed.lightBackground = new Color(parsed.lightBackground);
		parsed.colors = parsed.colors.map(({ name, light, dark }) => ({
			name,
			light: new Color(light),
			dark: new Color(dark)
		}));

		return parsed;
	} catch (error) {
		console.error('Failed to parse theme from localStorage:', error);
		localStorage.removeItem(THEME_KEY);
		return EMPTY_THEME;
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

	set lightBackground(value: Color) {
		this.#theme.lightBackground = value;
		this.persist();
	}

	get darkBackground() {
		return this.#theme.darkBackground;
	}

	set darkBackground(value: Color) {
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
