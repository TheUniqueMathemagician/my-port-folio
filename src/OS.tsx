import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "'Karla', sans-serif"
  },
  palette: {
    grey: {
      "50": "#000000",
      "100": "#000000",
      "200": "#000000",
      "300": "#000000",
      "400": "#000000",
      "500": "#000000",
      "600": "#000000",
      "700": "#000000",
      "800": "#000000",
      "900": "#000000",
      A100: "#000000",
      A200: "#000000",
      A400: "#000000",
      A700: "#000000"
    },
    divider: "#aaaaaa",
    text: {
      disabled: "#aaaaaa",
      hint: "#222222",
      primary: "#222222",
      secondary: "#aaaaaa"
    },
    error: {
      main: "#ff5853"
    },
    success: {
      main: "#45d97e"
    },
    info: {
      main: "#fab8ff"
    },
    warning: {
      main: "#ffbc40"
    },
    background: {
      default: "#eeeeee",
      paper: "#eeeeee"
    },
    type: "light",
    common: {
      black: "#222",
      white: "white"
    },
    primary: {
      main: "#6196ff"
    },
    secondary: {
      main: "#ff7dda"
    }
  }
});

const OS = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default OS;
