import Desktop from "./layouts/Desktop";
import Mobile from "./layouts/Mobile";
import isMobile from "./functions/isMobile";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";

const OS = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {isMobile() ? <Mobile></Mobile> : <Desktop></Desktop>}
      </BrowserRouter>
    </Provider>
  );
};

export default OS;
