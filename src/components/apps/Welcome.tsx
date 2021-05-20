import classes from "./Welcome.module.scss";
import { FunctionComponent, memo } from "react";
import Typography from "../UI/Typography";

interface IProps {}

const Welcome: FunctionComponent<IProps> = () => {
  return (
    <div className={classes["root"]}>
      <Typography variant="h2">Bienvenue !</Typography>
      <Typography variant="p">
        Bien qu'il ne soit pas encore entièrement terminé, voici déjà un aperçu
        de mes capacités.
      </Typography>
      <Typography variant="p">
        Attention, ceci reste un navigateur! <br /> Fun fact: il m'est arrivé
        plusieurs fois de vouloir fermer les fenêtres avec un raccourci,
        seulement c'était la page web qui se fermait...
      </Typography>
    </div>
  );
};

export default memo(Welcome);
