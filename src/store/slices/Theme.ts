import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EColorScheme } from "../../types/EColorScheme";

type Color = string;

type ColorPalette = {
  [EColorScheme.contrast]: Color;
  [EColorScheme.dark]: Color;
  [EColorScheme.default]: Color;
  [EColorScheme.light]: Color;
};

type Font = {
  fontSize: string;
  lineHeight: string;
};

interface ThemeState {
  colorScheme: EColorScheme;
  palette: {
    background: ColorPalette;
    disabled: ColorPalette;
    divider: ColorPalette;
    error: ColorPalette;
    hint: ColorPalette;
    info: ColorPalette;
    paper: ColorPalette;
    primary: ColorPalette;
    secondary: ColorPalette;
    success: ColorPalette;
    text: ColorPalette;
    ctext: ColorPalette;
    warning: ColorPalette;
  };
  transparency: boolean;
  typography: {
    body: Font;
    h1: Font;
    h2: Font;
    h3: Font;
    h4: Font;
    h5: Font;
    h6: Font;
  };
  workspaceBackgroundURL: string;
}

const initialState: ThemeState = {
  colorScheme: EColorScheme.dark,
  palette: {
    background: {
      [EColorScheme.contrast]: "#000000",
      [EColorScheme.dark]: "#333333",
      [EColorScheme.default]: "#cccccc",
      [EColorScheme.light]: "#ffffff"
    },
    disabled: {
      [EColorScheme.contrast]: "#808000",
      [EColorScheme.dark]: "#808080",
      [EColorScheme.default]: "#808080",
      [EColorScheme.light]: "#808080"
    },
    divider: {
      [EColorScheme.contrast]: "#ffffff",
      [EColorScheme.dark]: "#424242",
      [EColorScheme.default]: "#222222",
      [EColorScheme.light]: "#424242"
    },
    error: {
      [EColorScheme.contrast]: "#ff0000",
      [EColorScheme.dark]: "#ff5853",
      [EColorScheme.default]: "#ff5853",
      [EColorScheme.light]: "#ff5853"
    },
    hint: {
      [EColorScheme.contrast]: "#808080",
      [EColorScheme.dark]: "#808080",
      [EColorScheme.default]: "#808080",
      [EColorScheme.light]: "#aaaaaa"
    },
    info: {
      [EColorScheme.contrast]: "#0080ff",
      [EColorScheme.dark]: "#43accc",
      [EColorScheme.default]: "#43accc",
      [EColorScheme.light]: "#43accc"
    },
    paper: {
      [EColorScheme.contrast]: "#00000",
      [EColorScheme.dark]: "#080808",
      [EColorScheme.default]: "#ffffff",
      [EColorScheme.light]: "#ffffff"
    },
    primary: {
      [EColorScheme.contrast]: "#ffff00",
      [EColorScheme.dark]: "#4489f8",
      [EColorScheme.default]: "#0075db",
      [EColorScheme.light]: "#0088ff"
    },
    secondary: {
      [EColorScheme.contrast]: "#d772f3",
      [EColorScheme.dark]: "#d772f3",
      [EColorScheme.default]: "#d772f3",
      [EColorScheme.light]: "#d772f3"
    },
    success: {
      [EColorScheme.contrast]: "#00ff00",
      [EColorScheme.dark]: "#45d97e",
      [EColorScheme.default]: "#45d97e",
      [EColorScheme.light]: "#45d97e"
    },
    text: {
      [EColorScheme.contrast]: "#ffffff",
      [EColorScheme.dark]: "#ffffff",
      [EColorScheme.default]: "#000000",
      [EColorScheme.light]: "#000000"
    },
    ctext: {
      [EColorScheme.contrast]: "#000000",
      [EColorScheme.dark]: "#000000",
      [EColorScheme.default]: "#ffffff",
      [EColorScheme.light]: "#ffffff"
    },
    warning: {
      [EColorScheme.contrast]: "#ffff00",
      [EColorScheme.dark]: "#ffbc40",
      [EColorScheme.default]: "#ffbc40",
      [EColorScheme.light]: "#ffbc40"
    }
  },
  transparency: true,
  typography: {
    body: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h1: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h2: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h3: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h4: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h5: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    },
    h6: {
      fontSize: "1rem",
      lineHeight: "1.2em"
    }
  },
  workspaceBackgroundURL:
    "https://images.unsplash.com/photo-1536859975388-b5e6623e9223?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
};

const setRootVariables = () => {
  const root = document.getElementById("root");
  Object.keys(initialState.palette).forEach((key) => {
    const value = ((initialState.palette as any)[key] as ColorPalette)[
      initialState.colorScheme
    ];
    root?.style.setProperty(`--cvos-${key}`, value);
    // root?.style.setProperty(`--cvos-${key}-20`, `${value}14`);
    root?.style.setProperty(`--cvos-${key}-33`, `${value}55`);
    root?.style.setProperty(`--cvos-${key}-50`, `${value}80`);
    root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`);
  });
};

setRootVariables();

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setWorkspaceBackgroundURL: (state, action: PayloadAction<string>) => {
      state.workspaceBackgroundURL = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<EColorScheme>) => {
      state.colorScheme = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<ColorPalette>) => {
      state.palette.background = action.payload;
    },
    setPrimaryColor: (state, action: PayloadAction<ColorPalette>) => {
      state.palette.primary = action.payload;
    },
    setSecondaryColor: (state, action: PayloadAction<ColorPalette>) => {
      state.palette.secondary = action.payload;
    }
  }
});

export const {
  setWorkspaceBackgroundURL,
  setColorScheme,
  setBackgroundColor,
  setPrimaryColor,
  setSecondaryColor
} = themeSlice.actions;

export default themeSlice.reducer;
