import { Link } from "react-router-dom";
import React from "react";

const Error404 = () => {
  return (
    <>
      <p>Oops. La page que vous avez demandé n'existe pas.</p>
      <Link to="/">Accueil</Link>
    </>
  );
};

export default Error404;
