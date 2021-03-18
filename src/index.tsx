import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Desktop from "./layouts/Desktop";
import "./styles/global.scss";

render(
  <StrictMode>
    <BrowserRouter>
      <Desktop></Desktop>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
