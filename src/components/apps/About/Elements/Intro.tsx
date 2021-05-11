import classes from "./Intro.module.scss";
import { FunctionComponent, memo } from "react";
import Avatar from "../../../UI/Avatar";
import Typography from "../../../UI/Typography";
import Paper from "../../../UI/Paper";
import Divider from "../../../UI/Divider";

import Code from "../../../icons/Code";

interface IProps {}

const Intro: FunctionComponent<IProps> = () => {
  return (
    <div className={classes["root"]}>
      <header className={classes["intro"]}>
        <div className={classes["container"]}>
          <div className={classes["avatar"]}>
            <Avatar
              square
              alt="Moi"
              src="https://alexstudio.ch/wp-content/uploads/2019/01/business.portrait.cv_.resume.geneva.30.jpg"
              size="xl"
            ></Avatar>
          </div>
          <Paper
            blur
            spaced
            className={classes["name"]}
            background="background"
          >
            <Typography variant="h2" tag="h1" className={classes["name"]}>
              TAMBURRINI Yannick
            </Typography>
          </Paper>
        </div>
        <Typography variant="p" className={classes["text"]}>
          Electromécanicien de formation, développeur par passion. Esprit
          analytique, team-player, enthousiaste des nouvelles technologies,
          orienté performance et expérience utilisateur, spécialisé frameworks
          fron-tend tels que Vue et React en TypeScript
        </Typography>
        <Typography variant="body">
          PS: Ce n'est pas moi sur l'image, mais en attendant ça fait joli :p
        </Typography>
      </header>
      <Divider inset></Divider>
      <Typography variant="h4">Mes compétences</Typography>
      <article className={classes["skills"]}>
        {/* TODO: open application with args ( dev, ui/ux, ... arguments) */}
        <Paper spaced className={classes["bubble"]} background="paper">
          <Code className={classes["icon"]}></Code>
          <Typography variant="h6" tag="h5">
            Développement
          </Typography>
        </Paper>
        <Paper spaced className={classes["bubble"]} background="paper">
          <Code className={classes["icon"]}></Code>
          <Typography variant="h6" tag="h5">
            UI / UX
          </Typography>
        </Paper>
        <Paper spaced className={classes["bubble"]} background="paper">
          <Code className={classes["icon"]}></Code>
          <Typography variant="h6" tag="h5">
            Développement
          </Typography>
        </Paper>
      </article>
      <Divider inset></Divider>
      <article className={classes["experiences"]}>
        <Typography variant="h4">Mon expérience</Typography>
        <ul>
          <li>
            <Paper fullWidth spaced background="paper">
              <div className={classes["date"]}>2017</div>
              <div>
                <Typography variant="h5">Electromécanicien</Typography>
                <ul>
                  <Typography variant="body" tag="li">
                    Acquisition de données
                  </Typography>
                  <Typography variant="body" tag="li">
                    Conception d’un logiciel d’interfaçage ( VB .Net, RS485 )
                  </Typography>
                  <Typography variant="body" tag="li">
                    Configuration de thermorégulateurs ( Cycles et PID )
                  </Typography>
                  <Typography variant="body" tag="li">
                    Conception de plans électrique ( Eplan )
                  </Typography>
                  <Typography variant="body" tag="li">
                    Maintenance curative et préventive ( tableaux électriques,
                    tours & fraiseuses, moteurs asynchrones, étuves, etc... )
                  </Typography>
                </ul>
              </div>
            </Paper>
          </li>
        </ul>
      </article>
      <Divider inset></Divider>
      <article className={classes["experiences"]}>
        <Typography variant="h4">Mes formations</Typography>
        <Typography variant="h6">
          Master électronique ( non complété )
        </Typography>
        <Typography variant="p">Haute Ecole de la Province de Liège</Typography>
        <Typography variant="h6">Bachelier électromécanique</Typography>
        <Typography variant="h6">Haute École Henallux Seraing</Typography>
        <Typography variant="h6">CESS électronique-informatique</Typography>
        <Typography variant="h6">Enseignement Polytechnique Vervier</Typography>
        Soudure arc, oxy-acétylène, TIG Institut Saint-Laurent BA4, BA5, VCA
        Vinçotte-Academy sa
      </article>
    </div>
  );
};

export default memo(Intro);
