import style from "styled-components";
import ApplicationFrame from "../components/ApplicationFrame";

const Footer = style.footer`
  background-color: var(--dark, #3333337F);
  min-height: 40px;
`;

const Main = () => {
  return (
    <>
      <main onDragOver={(e) => e.preventDefault()}>
        <ApplicationFrame>Coucou</ApplicationFrame>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Main;
