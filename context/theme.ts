import { ColorPalette } from "@/types/ColorPalette"
import { ColorScheme } from "@/types/ColorScheme"
import { create } from "zustand"

type Font = {
	fontSize: string
	lineHeight: string
}

type ThemeStore = {
	colorScheme: ColorScheme
	palette: {
		background: ColorPalette
		disabled: ColorPalette
		divider: ColorPalette
		error: ColorPalette
		hint: ColorPalette
		info: ColorPalette
		paper: ColorPalette
		primary: ColorPalette
		secondary: ColorPalette
		success: ColorPalette
		text: ColorPalette
		ctext: ColorPalette
		warning: ColorPalette
	}
	transparency: boolean
	typography: {
		body: Font
		h1: Font
		h2: Font
		h3: Font
		h4: Font
		h5: Font
		h6: Font
	}
	workspaceBackground: typeof Image | null
	workspaceBackgroundUrl: string
	setBackgroundColor: (colorPalette: ColorPalette) => void
	setColorScheme: (colorScheme: ColorScheme) => void
	setPrimaryColor: (colorPalette: ColorPalette) => void
	setSecondaryColor: (colorPalette: ColorPalette) => void
	setWorkspaceBackgroundUrl: (url: string) => void
}

const palette: ThemeStore["palette"] = {
	background: {
		[ColorScheme.contrast]: "#000000",
		[ColorScheme.dark]: "#333333",
		[ColorScheme.default]: "#cccccc",
		[ColorScheme.light]: "#ffffff",
	},
	disabled: {
		[ColorScheme.contrast]: "#808000",
		[ColorScheme.dark]: "#808080",
		[ColorScheme.default]: "#808080",
		[ColorScheme.light]: "#808080",
	},
	divider: {
		[ColorScheme.contrast]: "#ffffff",
		[ColorScheme.dark]: "#424242",
		[ColorScheme.default]: "#222222",
		[ColorScheme.light]: "#424242",
	},
	error: {
		[ColorScheme.contrast]: "#ff0000",
		[ColorScheme.dark]: "#ff5853",
		[ColorScheme.default]: "#ff5853",
		[ColorScheme.light]: "#ff5853",
	},
	hint: {
		[ColorScheme.contrast]: "#808080",
		[ColorScheme.dark]: "#808080",
		[ColorScheme.default]: "#808080",
		[ColorScheme.light]: "#aaaaaa",
	},
	info: {
		[ColorScheme.contrast]: "#0080ff",
		[ColorScheme.dark]: "#43accc",
		[ColorScheme.default]: "#43accc",
		[ColorScheme.light]: "#43accc",
	},
	paper: {
		[ColorScheme.contrast]: "#00000",
		[ColorScheme.dark]: "#080808",
		[ColorScheme.default]: "#ffffff",
		[ColorScheme.light]: "#ffffff",
	},
	primary: {
		[ColorScheme.contrast]: "#ffff00",
		[ColorScheme.dark]: "#4489f8",
		[ColorScheme.default]: "#0075db",
		[ColorScheme.light]: "#0088ff",
	},
	secondary: {
		[ColorScheme.contrast]: "#d772f3",
		[ColorScheme.dark]: "#d772f3",
		[ColorScheme.default]: "#d772f3",
		[ColorScheme.light]: "#d772f3",
	},
	success: {
		[ColorScheme.contrast]: "#00ff00",
		[ColorScheme.dark]: "#45d97e",
		[ColorScheme.default]: "#45d97e",
		[ColorScheme.light]: "#45d97e",
	},
	text: {
		[ColorScheme.contrast]: "#ffffff",
		[ColorScheme.dark]: "#ffffff",
		[ColorScheme.default]: "#000000",
		[ColorScheme.light]: "#000000",
	},
	ctext: {
		[ColorScheme.contrast]: "#000000",
		[ColorScheme.dark]: "#000000",
		[ColorScheme.default]: "#ffffff",
		[ColorScheme.light]: "#ffffff",
	},
	warning: {
		[ColorScheme.contrast]: "#ffff00",
		[ColorScheme.dark]: "#ffbc40",
		[ColorScheme.default]: "#ffbc40",
		[ColorScheme.light]: "#ffbc40",
	},
}

const typography: ThemeStore["typography"] = {
	body: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h1: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h2: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h3: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h4: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h5: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
	h6: {
		fontSize: "1rem",
		lineHeight: "1.2em",
	},
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
	colorScheme: ColorScheme.dark,
	palette,
	transparency: true,
	typography,
	workspaceBackground: null,
	workspaceBackgroundUrl: "https://images.unsplash.com/photo-1536859975388-b5e6623e9223?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
	setWorkspaceBackgroundUrl: (workspaceBackgroundUrl) => set(() => ({ workspaceBackgroundUrl })),
	setColorScheme: (colorScheme) => set(() => ({ colorScheme })),
	setBackgroundColor: (background) => {
		const state = get()

		state.palette.background = background

		set(() => ({}))
	},
	setPrimaryColor: (primary) => {
		const state = get()

		state.palette.primary = primary

		set(() => ({}))
	},
	setSecondaryColor: (secondary) => {
		const state = get()

		state.palette.secondary = secondary

		set(() => ({}))
	},
}))
