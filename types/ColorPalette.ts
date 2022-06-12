import { ColorScheme } from "./ColorScheme"

export type ColorPalette = {
	[ColorScheme.contrast]: string
	[ColorScheme.dark]: string
	[ColorScheme.default]: string
	[ColorScheme.light]: string
}
