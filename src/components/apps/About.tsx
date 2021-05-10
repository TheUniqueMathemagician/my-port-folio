import classes from "./About.module.scss";
import { FunctionComponent, memo, useState } from "react";
import Typography from "../UI/Typography";
import Paper from "../UI/Paper";
import Avatar from "../UI/Avatar";
import Rating from "../UI/Rating";
import Tab from "../UI/Tab";
import Tabs from "../UI/Tabs";
import { useSelector } from "../../hooks/Store";
import { EColorScheme } from "../../types/EColorScheme";
import TabPanel from "../UI/TabPanel";
import Code from "../icons/Code";
import Button from "../UI/Button";
import Divider from "../UI/Divider";

interface IProps {}

enum ETabs {
  about,
  discoveries,
  experiences,
  hobbies,
  skills
}

interface ISKill {
  level: number;
  name: string;
}

interface IDiscover {
  link: string;
  name: string;
}

const About: FunctionComponent<IProps> = () => {
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  //#region Skills

  const languageSkills: ISKill[] = [
    {
      level: 3,
      name: "HTML"
    },
    {
      level: 3,
      name: "CSS"
    },
    {
      level: 3,
      name: "Scss"
    },
    {
      level: 5,
      name: "Javascript"
    },
    {
      level: 4,
      name: "Typescript"
    },
    {
      level: 2,
      name: "C++"
    },
    {
      level: 2,
      name: "C#"
    },
    {
      level: 2,
      name: "Python"
    },
    {
      level: 2,
      name: "PHP"
    }
  ];
  const softwareSkills: ISKill[] = [
    {
      level: 1,
      name: "Adobe Photoshop"
    },
    {
      level: 1,
      name: "Adobe InDesign"
    },
    {
      level: 1,
      name: "Adobe Illustrator"
    },
    {
      level: 3,
      name: "Adobe XD"
    },
    {
      level: 3,
      name: "Figma"
    }
  ];
  const frameworkSkills: ISKill[] = [
    {
      level: 3,
      name: "Electron"
    },
    {
      level: 3,
      name: "Express"
    },
    {
      level: 1,
      name: "Angular"
    },
    {
      level: 4,
      name: "Vue"
    },
    {
      level: 3,
      name: "React"
    }
  ];

  //#endregion

  const discovers: IDiscover[] = [
    {
      link: "",
      name: "Material UI"
    },
    {
      link: "",
      name: "Bootstrap"
    },
    {
      link: "",
      name: "Flutter / Dart"
    },
    {
      link: "",
      name: "Xamarin"
    },
    {
      link: "",
      name: "Windows Presentation Form"
    }
  ];

  return (
    <div className={classes["root"]}>
      {/* TODO: add selection for skills 'junior medior senior' */}
      <Tabs
        direction="right"
        defaultValue={0}
        onChange={(v: number) => setPanelIndex(v)}
        separator={contrast}
      >
        <Tab
          active={panelIndex === ETabs.about}
          label="Profil"
          value={ETabs.about}
        />
        <Tab
          active={panelIndex === ETabs.skills}
          label="Compétences"
          value={ETabs.skills}
        />
        <Tab
          active={panelIndex === ETabs.discoveries}
          label="Découvertes"
          value={ETabs.discoveries}
        />
        <Tab label="Loisirs" active={panelIndex === 3} value={ETabs.hobbies} />
        <Tab
          active={panelIndex === ETabs.experiences}
          label="Expériences"
          value={ETabs.experiences}
        />
      </Tabs>
      <TabPanel
        index={ETabs.about}
        value={panelIndex}
        className={classes["tab-panel"]}
        spaced
      >
        <div>
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
                <Typography
                  variant="h2"
                  tag="h1"
                  noSelect
                  className={classes["name"]}
                >
                  TAMBURRINI Yannick
                </Typography>
              </Paper>
            </div>
            <Typography variant="p" noSelect className={classes["text"]}>
              Electromécanicien de formation, développeur par passion. Esprit
              analytique, team-player, enthousiaste des nouvelles technologies,
              orienté performance et expérience utilisateur, spécialisé
              frameworks fron-tend tels que Vue et React en TypeScript
            </Typography>
            <Typography variant="body" noSelect>
              PS: Ce n'est pas moi sur l'image, mais en attendant ça fait joli
              :p
            </Typography>
          </header>
          <Divider inset></Divider>
          <Typography variant="h4" noSelect>
            Mes compétences
          </Typography>
          <article className={classes["skills"]}>
            {/* TODO: open application with args ( dev, ui/ux, ... arguments) */}
            <Paper spaced className={classes["bubble"]} outlined>
              {console.log(classes["icon"])}
              <Code className={classes["icon"]}></Code>
              <Typography variant="h6" tag="h5" noSelect>
                Développement
              </Typography>
            </Paper>
            <Paper spaced className={classes["bubble"]} outlined>
              <Code className={classes["icon"]}></Code>
              <Typography variant="h6" tag="h5" noSelect>
                UI / UX
              </Typography>
            </Paper>
            <Paper spaced className={classes["bubble"]} outlined>
              <Code className={classes["icon"]}></Code>
              <Typography variant="h6" tag="h5" noSelect>
                Développement
              </Typography>
            </Paper>
          </article>
          <Divider inset></Divider>
          <article className={classes["experiences"]}>
            <Typography variant="h4" noSelect>
              Mon expérience
            </Typography>
            <ul>
              <li>
                <Paper blur background="background" fullWidth outlined spaced>
                  <div className={classes["date"]}>2017</div>
                  <div>
                    <Typography variant="h5">Electromécanicien</Typography>
                    <ul>
                      <Typography variant="body" tag="li">
                        Acquisition de données
                      </Typography>
                      <Typography variant="body" tag="li">
                        Conception d’un logiciel d’interfaçage ( VB .Net, RS485
                        )
                      </Typography>
                      <Typography variant="body" tag="li">
                        Configuration de thermorégulateurs ( Cycles et PID )
                      </Typography>
                      <Typography variant="body" tag="li">
                        Conception de plans électrique ( Eplan )
                      </Typography>
                      <Typography variant="body" tag="li">
                        Maintenance curative et préventive ( tableaux
                        électriques, tours & fraiseuses, moteurs asynchrones,
                        étuves, etc... )
                      </Typography>
                    </ul>
                  </div>
                </Paper>
              </li>
            </ul>
          </article>
          <Divider inset></Divider>
          <article className={classes["experiences"]}>
            <Typography variant="h4" noSelect>
              Mes formations
            </Typography>
          </article>
        </div>
      </TabPanel>
      <TabPanel index={ETabs.skills} value={panelIndex} spaced>
        <Typography noWrap noSelect variant="h4">
          Compétences
        </Typography>
        <Paper
          spaced
          blur
          background="background"
          outlined
          className={classes["grid"]}
        >
          <Typography
            noWrap
            noSelect
            variant="h5"
            className={classes["row-span"]}
          >
            Langages
          </Typography>
          {languageSkills.map((skill) => (
            <>
              <Typography noWrap noSelect variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </>
          ))}
          <Typography
            noWrap
            noSelect
            variant="h5"
            className={classes["row-span"]}
          >
            Frameworks
          </Typography>
          {frameworkSkills.map((skill) => (
            <>
              <Typography noWrap noSelect variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </>
          ))}
          <Typography
            noWrap
            noSelect
            variant="h5"
            className={classes["row-span"]}
          >
            Logiciels
          </Typography>
          {softwareSkills.map((skill) => (
            <>
              <Typography noWrap noSelect variant="body">
                {skill.name}
              </Typography>
              <Rating
                readOnly
                defaultValue={skill.level}
                min={1}
                max={5}
              ></Rating>
            </>
          ))}
        </Paper>
      </TabPanel>
      <TabPanel index={ETabs.discoveries} value={panelIndex} spaced>
        <Typography variant="h4">Découvertes</Typography>
        <Paper outlined spaced>
          <Typography variant="p">
            Il m'est arrivé lors de mes péripécies de développeur de découvrir
            différentes technologies / librairies
          </Typography>
          <Typography variant="p">En voici quelques-unes:</Typography>
          <ul className={classes["discover"]}>
            {discovers.map((discover) => (
              <li key={discover.name}>{discover.name}</li>
            ))}
          </ul>
        </Paper>
      </TabPanel>
      <TabPanel index={3} value={panelIndex} spaced>
        <Typography variant="h4">Loisirs</Typography>
        <Paper outlined spaced>
          <Typography variant="p">
            Voici une liste (non exhaustive) des choses que j'aime et que j'aime
            faire
          </Typography>
          <Typography variant="h5">Code</Typography>
          <Typography variant="p">
            Bien évidement le code et le développement en font partie. J'ai
            commencé vers à l'adolescence et j'ai très vite accroché. La vie et
            les choix que j'ai fait m'ont amené à étudier l'électromécanique ..
          </Typography>
          <Typography variant="h5">Guitare</Typography>
          <Typography variant="h5">Guitare</Typography>
        </Paper>
      </TabPanel>
    </div>
  );
};

export default memo(About);
