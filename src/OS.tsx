import ApplicationsProvider from "./data/Applications";
import ThemeProvider from "./data/Theme";
// import UserProvider from "./data/User";
import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { BrowserRouter } from "react-router-dom";

const OS = () => {
  return (
    <ApplicationsProvider>
      <ThemeProvider>
        <BrowserRouter>
          {/* <UserProvider> */}
          {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
          {/* </UserProvider> */}
        </BrowserRouter>
      </ThemeProvider>
    </ApplicationsProvider>
  );
};

export default OS;
