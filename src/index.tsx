import { StrictMode } from "react";
import { render } from "react-dom";
import "./styles/global.scss";

render(
  <StrictMode>
    <main></main>
  </StrictMode>,
  document.getElementById("root")
);
