import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { Provider as StoreProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";

const OS = () => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
      </BrowserRouter>
    </StoreProvider>
  );
};

export default OS;
