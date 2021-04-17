import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ColorScheme {
  default,
  dark,
  light,
  contrast
}

interface ThemeState {
  workspaceBackgroundURL: string;
  colorScheme: ColorScheme;
}

const initialState: ThemeState = {
  colorScheme: ColorScheme.default,
  workspaceBackgroundURL:
    "https://images.unsplash.com/photo-1536859975388-b5e6623e9223?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setWorkspaceBackgroundURL: (state, action: PayloadAction<string>) => {
      state.workspaceBackgroundURL = action.payload;
    },
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;
    }
  }
});

export const { setWorkspaceBackgroundURL, setColorScheme } = themeSlice.actions;

export default themeSlice.reducer;
