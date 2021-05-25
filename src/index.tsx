import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";

import OS from "./OS";

import "./styles/global.scss";

render(
  <StrictMode>
    <StoreProvider store={store}>
      <OS></OS>
    </StoreProvider>
  </StrictMode>,
  document.getElementById("root")
);
