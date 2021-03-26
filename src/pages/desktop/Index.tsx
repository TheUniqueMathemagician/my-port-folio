import { Link } from "react-router-dom";

const Index = () => {
  return (
    <main>
      <h1>Voici la page d'accueil</h1>
      <Link to="/workspace">Se connecter</Link>
    </main>
  );
};

export default Index;
