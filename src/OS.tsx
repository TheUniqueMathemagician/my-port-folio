import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
// import { ThemeProvider } from "@material-ui/styles";
// import { createMuiTheme } from "@material-ui/core";
// import { Palette } from "@material-ui/core/styles/createPalette";

// const theme = createMuiTheme({
//   palette: {
//     error: {
//       main: "#ff604f",
//     },
//   } as Palette
// });

const OS = () => {
  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </Provider>
  );
};

// declare module "@material-ui/core/styles/createPalette" {
//   interface Palette {
//     error: Palette["primary"];
//   }
//   interface PaletteOptions {
//     error: PaletteOptions["primary"];
//   }
// }

export default OS;
