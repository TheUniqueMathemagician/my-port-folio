import {FC, memo} from "react";
import generateID from "../../../../functions/generateID";
import {useSelector} from "../../../../hooks/Store";
import {WindowInstance} from "../../../../store/slices/Applications/Types";
import {EBreakpoints} from "../../../../types/EBreakpoints";
import Avatar from "../../../ui/Avatar";
import Divider from "../../../ui/Divider";
import Paper from "../../../ui/Paper";
import Typography from "../../../ui/Typography";
import classes from "./Intro.module.scss";

interface Props {
  pid: string;
}

interface IEducation {
  date: number;
  detail: string;
  title: string;
}

const emEducation: IEducation[] = [
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

const itEducation: IEducation[] = [
  {
    date: -1,
    title: "HTML CSS  JS C++  C#",
    detail: "Openclassroom"
  },
  {
    date: -1,
    title: "WebPack",
    detail: "Openclassroom"
  },
  {
    date: -1,
    title: "NodeJS",
    detail: "Openclassroom"
  },
  {
    date: -1,
    title: "HTML CSS  JS C++  C#",
    detail: "Sololearn"
  },
  {
    date: -1,
    title: "Le reste",
    detail: "Autodidacte"
  }
];

const Intro: FC<Props> = (props) => {
  const {pid} = props;

  const small = useSelector((store) => {
    const instance = store.applications.instances[pid] as WindowInstance;
    if (instance.breakpoint === EBreakpoints.sm) return true;
    if (instance.breakpoint === EBreakpoints.xs) return true;
    return false;
  });

  const rootClasses = [classes["root"]];

  if (small) rootClasses.push(classes["small"]);

  return <div className={rootClasses.join(" ")}>
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
      <Typography variant="h5">Enseignement</Typography>
      <ul>
        {emEducation
          .sort((a, b) => b.date - a.date)
          .map((education) => (
            <li key={education.title}>
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
      <Typography variant="h5">Autodidacte</Typography>
      <ul>
        {itEducation
          .sort((a, b) => b.date - a.date)
          .map((education) => (
            <li key={generateID()}>
              <Typography variant="body" className={classes["date"]}>
                /
              </Typography>
              <Typography variant="h6">{education.title}</Typography>
              <Typography variant="body" color="hint">
                {education.detail}
              </Typography>
            </li>
          ))}
      </ul>
    </article>
  </div>;
};

export default memo(Intro);
