import classes from "./Error404.module.scss";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <main className={classes["root"]}>
      <p>Oops. La page que vous avez demandée n'existe pas.</p>
      <Link to="/">Accueil</Link>
    </main>
  );
};

export default Error404;
