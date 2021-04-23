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
