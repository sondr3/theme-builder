import {
	apcaContrastValue,
	hex,
	isValidColor,
	round,
	wcagContrastValue
} from 'a11y-color-contrast';
import type Color from 'colorjs.io';

export interface ThemeColor {
	name: string;
	light: Color;
	dark: Color;
}

export interface Theme {
	name?: string;
	lightBackground: Color;
	darkBackground: Color;
	colors: Array<ThemeColor>;
}

export const isValid = (c: Color) => {
	return isValidColor(hex(c.toString({ format: 'hex' })));
};

export const calcWcag = (fg: Color, bg: Color) => {
	return round(
		wcagContrastValue(
			hex(fg.to('srgb').toString({ format: 'hex' })),
			hex(bg.to('srgb').toString({ format: 'hex' }))
		)
	);
};

export const calcApca = (fg: Color, bg: Color) => {
	return round(
		Math.abs(
			apcaContrastValue(
				hex(fg.to('srgb').toString({ format: 'hex' })),
				hex(bg.to('srgb').toString({ format: 'hex' }))
			)
		)
	);
};
