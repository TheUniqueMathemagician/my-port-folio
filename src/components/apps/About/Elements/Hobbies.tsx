import classes from "./Hobbies.module.scss";
import { FunctionComponent, memo } from "react";
import Paper from "../../../UI/Paper";
import Typography from "../../../UI/Typography";

interface IProps {
  pid: string;
}

const Hobbies: FunctionComponent<IProps> = () => {
  return (
    <div className={classes["root"]}>
      <Typography variant="h4">Loisirs</Typography>
      <Typography variant="h5">Code</Typography>
      <Paper spaced background="paper">
        {/* <Typography variant="p">
          Voici une liste (non exhaustive) des choses que j'aime et que j'aime
          faire
        </Typography> */}
        <Typography variant="p">
          Bien évidement le code et le développement en font partie. J'ai
          commencé vers à l'adolescence et j'ai très vite accroché. La vie et
          les choix que j'ai fait m'ont amené à étudier l'électromécanique, et
          j'aimerais coupler mes études à ma passion.
        </Typography>
      </Paper>
      <Typography variant="h5">Guitare</Typography>
      <Paper spaced background="paper">
        <Typography variant="p">
          Je joue de la guitare depuis une bonne décénie et je ne m'en lasse
          pas. Actuellement je ne suis pas dans un groupe, mais si vous chercher
          un guitariste dans la région de Liège et que vous aimer le métal \m/ (
          sachant que je n'écoute pas de musique où "ça crie" et que je ne suis
          pas forcément sataniste )
        </Typography>
      </Paper>
      <Typography variant="h5">Nature</Typography>
      <Paper spaced background="paper">
        <Typography variant="p">
          J'aime tout ce qui touche à la nature, que ce soit une promenade en
          forêt ou encore entretenir mon petit potager.
        </Typography>
      </Paper>
    </div>
  );
};

export default memo(Hobbies);
