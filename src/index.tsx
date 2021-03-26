import { StrictMode } from "react";
import { render } from "react-dom";
import OS from "./OS";
import "./styles/global.scss";

render(
  <StrictMode>
    <OS></OS>
  </StrictMode>,
  document.getElementById("root")
);
