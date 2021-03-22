import style from "styled-components";
import Window from "../components/Window";
import WindowFrame from "../components/WindowFrame";

const Footer = style.footer`
  background-color: var(--dark, #3333337F);
  min-height: 40px;
`;

const Main = () => {
  return (
    <>
      <main onDragOver={(e) => e.preventDefault()}>
        <WindowFrame>
          <Window></Window>
          <Window></Window>
          <Window></Window>
        </WindowFrame>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Main;
