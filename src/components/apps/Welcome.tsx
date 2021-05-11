import classes from "./Welcome.module.scss";
import { FunctionComponent, memo } from "react";
import Typography from "../UI/Typography";

interface IProps {}

const Welcome: FunctionComponent<IProps> = () => {
  return (
    <div className={classes["root"]}>
      <Typography variant="h2">Bienvenue !</Typography>
      <Typography variant="body">
        Bien qu'il ne soit pas encore entièrement terminé, voici déjà un aperçu
        de mes capacités.
      </Typography>
    </div>
  );
};

export default memo(Welcome);
