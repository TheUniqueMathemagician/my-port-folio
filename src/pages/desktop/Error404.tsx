import style from "styled-components";
import { Link } from "react-router-dom";

let Error404Style = style.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: #333333;
`;

const Error404 = () => {
  return (
    <Error404Style>
      <p>Oops. La page que vous avez demandé n'existe pas.</p>
      <Link to="/">Accueil</Link>
    </Error404Style>
  );
};

export default Error404;
