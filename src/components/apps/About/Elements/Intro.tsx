import classes from "./Intro.module.scss";
import { FunctionComponent, memo } from "react";
import Avatar from "../../../UI/Avatar";
import Typography from "../../../UI/Typography";
import Paper from "../../../UI/Paper";
import Divider from "../../../UI/Divider";

import { useSelector } from "../../../../hooks/Store";
import { WindowInstance } from "../../../../store/reducers/Instances";

interface IProps {
  pid: string;
}

interface IEducation {
  date: number;
  detail: string;
  title: string;
}

const educations: IEducation[] = [
  {
    date: 2019,
    title: "Master électronique ( non complété )",
    detail: "Haute École de la Province de Liège"
  },
  {
    date: 2017,
    title: "Bachelier électromécanique",
    detail: "Haute École Henallux Seraing"
  },
  {
    date: 2013,
    title: "CESS électronique-informatique",
    detail: "Enseignement Polytechnique Verviers"
  },
  {
    date: 2015,
    title: "Soudure arc, oxy-acétylène, TIG",
    detail: "Institut Saint-Laurent"
  },
  {
    date: 2016,
    title: "BA4, BA5, VCA",
    detail: "Vinçotte-Academy sa"
  }
];

const Intro: FunctionComponent<IProps> = (props) => {
  const { pid } = props;
  const small = useSelector(
    (store) =>
      ((store.instances.elements[pid] as WindowInstance)?.dimensions.width ??
        0) < 800
  );

  const rootClasses = [classes["root"]];

  if (small) rootClasses.push(classes["small"]);

  return (
    <div className={rootClasses.join(" ")}>
      <header className={classes["intro"]}>
        <div className={classes["avatar-container"]}>
          <Avatar
            square
            className={classes["avatar"]}
            alt="Moi"
            src="https://alexstudio.ch/wp-content/uploads/2019/01/business.portrait.cv_.resume.geneva.30.jpg"
            size="xl"
          ></Avatar>
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
        <div className={classes["text-container"]}>
          <Typography variant="p" className={classes["text"]}>
            Electromécanicien de formation, développeur par passion. Esprit
            analytique, team-player, enthousiaste des nouvelles technologies,
            orienté performance et expérience utilisateur, spécialisé frameworks
            fron-tend tels que Vue et React en TypeScript
          </Typography>
        </div>
        <Typography variant="body">
          PS: Ce n'est pas moi sur l'image, mais en attendant ça fait joli :p
        </Typography>
      </header>
      <Divider inset></Divider>
      <Typography variant="h4">Mes compétences</Typography>
      <article className={classes["skills"]}>
        {/* TODO: open application with args ( dev, ui/ux, ... arguments) */}
        <Paper spaced className={classes["bubble"]} background="paper">
          {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
          <img
            src={require("../../../../assets/images/solved.svg").default}
            alt="UI/UX"
            className={classes["icon"]}
          />
          <Typography variant="h6" tag="h5">
            Problem solving
          </Typography>
        </Paper>
        <Paper spaced className={classes["bubble"]} background="paper">
          {/* <div>Icônes conçues par <a href="https://www.flaticon.com/fr/auteurs/xnimrodx" title="xnimrodx">xnimrodx</a> from <a href="https://www.flaticon.com/fr/" title="Flaticon">www.flaticon.com</a></div> */}
          <img
            src={require("../../../../assets/images/ui.svg").default}
            alt="UI/UX"
            className={classes["icon"]}
          />
          <Typography variant="h6" tag="h5">
            UI / UX
          </Typography>
        </Paper>
        <Paper spaced className={classes["bubble"]} background="paper">
          {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
          <img
            src={require("../../../../assets/images/innovation.svg").default}
            alt="UI/UX"
            className={classes["icon"]}
          />
          <Typography variant="h6" tag="h5">
            Innovation
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
      <article className={classes["education"]}>
        <Typography variant="h4">Mes formations</Typography>
        <ul>
          {educations
            .sort((a, b) => b.date - a.date)
            .map((education) => (
              <li>
                <Typography variant="body" className={classes["date"]}>
                  {education.date}
                </Typography>
                <Typography variant="h6">{education.title}</Typography>
                <Typography variant="body" color="hint">
                  {education.detail}
                </Typography>
              </li>
            ))}
        </ul>
      </article>
    </div>
  );
};

export default memo(Intro);
