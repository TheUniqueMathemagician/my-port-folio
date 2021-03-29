import InstalledApplicationsProvider from "./data/InstalledApplications";
import OpenedApplicationsProvider from "./data/OpenedApplications";
import ThemeProvider from "./data/Theme";
// import UserProvider from "./data/User";
import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { BrowserRouter } from "react-router-dom";

const OS = () => {
  return (
    <InstalledApplicationsProvider>
      <OpenedApplicationsProvider>
        <ThemeProvider>
          <BrowserRouter>
            {/* <UserProvider> */}
            {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
            {/* </UserProvider> */}
          </BrowserRouter>
        </ThemeProvider>
      </OpenedApplicationsProvider>
    </InstalledApplicationsProvider>
  );
};

export default OS;
