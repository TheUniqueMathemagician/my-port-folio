import ApplicationsProvider from "./data/Applications";
import InstancesProvider from "./data/Instances";
import ThemeProvider from "./data/Theme";
import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { BrowserRouter } from "react-router-dom";
import UsersProvider from "./data/Users";

const OS = () => {
  return (
    <UsersProvider>
      <ApplicationsProvider>
        <InstancesProvider>
          <ThemeProvider>
            <BrowserRouter>
              {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
            </BrowserRouter>
          </ThemeProvider>
        </InstancesProvider>
      </ApplicationsProvider>
    </UsersProvider>
  );
};

export default OS;
