import classes from "./Projects.module.scss";
import { FunctionComponent, memo } from "react";
import Typography from "../UI/Typography";
import Avatar from "../UI/Avatar";
import Paper from "../UI/Paper";
import Button from "../UI/Input/Button";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/slices/Applications";
import {
  Applications,
  WindowInstance
} from "../../store/slices/Applications/Types";
import { EBreakpoints } from "../../types/EBreakpoints";

interface IProps {
  pid: string;
}

// https://ibb.co/JnBtVmx
// https://ibb.co/x3VGHKB
// https://ibb.co/cT5DKp0
// https://ibb.co/47fgVBr
// https://ibb.co/TwDyj3m
// https://ibb.co/BjV3gZV

const Projects: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const dispatch = useDispatch();

  const small = useSelector((store) => {
    const instance = store.applications.instances[pid] as WindowInstance;
    if (instance.breakpoint === EBreakpoints.sm) return true;
    if (instance.breakpoint === EBreakpoints.xs) return true;
    return false;
  });

  const rootClasses = [classes["root"]];

  if (small) rootClasses.push(classes["small"]);

  return (
    <div className={rootClasses.join(" ")}>
      <div className={classes["grid"]}>
        <Paper
          tag="article"
          className={classes["paper"]}
          blur
          background="paper"
        >
          <Paper tag="header">
            <Typography variant="h4">Port-folio</Typography>
          </Paper>
          <div className={classes["content"]}>
            <Button
              isIcon
              focusable
              onClick={() => {
                dispatch(
                  runApplication({
                    aid: Applications.Image,
                    args: {
                      alt: "Port-folio",
                      src: "https://i.ibb.co/P4Zj5hZ/SPOILER-Desktop-2.png"
                    }
                  })
                );
              }}
              className={classes["project-link"]}
            >
              <Avatar
                alt="Port-folio"
                src="https://i.ibb.co/P4Zj5hZ/SPOILER-Desktop-2.png"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                L'image affich??e vient d'une version pr??c??dente de ce
                port-folio.
              </Typography>
              <Typography variant="p">
                Ce projet a compt?? plusieurs versions, chacune bas??e sur des
                technologies diff??rentes et des concepts ?? part. Au final, j'ai
                d??cid?? d'apprendre React et perfectionner TypeScript en le
                faisant.
              </Typography>
              <Typography variant="p">
                Il m'a permis d'en apprendre plus sur react (memoization,
                profiler, HOC, render props, etc...), plus sur Typescript
                (interfaces, ??num??rations, Omit, union types, etc...) et redux.
                J'ai d'abord ??t?? tr??s r??ticent ?? l'utilisation de redux, surtout
                d?? ?? sa syntaxe peu avenante, et puis je suis tomb?? sur
                redux/toolkit qui m'a fait changer d'avis. J'avais avant tout
                besoin d'une solution de state management car l'application
                commen??ait ?? devenir complexe. J'ai test?? d'autres solutions
                mais celle-ci s'est av??r??e ??tre plus que suffisante et
                relativement efficace (bien que je n'adh??re pas l'approche du
                flux unidirectionnel de redux).
              </Typography>
              <Typography variant="p">
                Au d??part, j'avais utilis?? plusieurs librairies, notamment
                material UI pour l'interface. J'ai finalement choisi de faire
                toute l'application avec mes petites mains car le but ??tait
                surtout de montrer ce que je savais faire, et non ce que les
                autres savent faire.
              </Typography>
              <Typography variant="p">
                Pour rester bref, je vais m'arr??ter l??. Si
                <span
                  className={classes["link"]}
                  onClick={() => {
                    dispatch(
                      runApplication({ aid: Applications.Contact, args: {} })
                    );
                  }}
                >
                  &nbsp;vous avez des questions&nbsp;
                </span>
                n'h??sitez pas.
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          tag="article"
          className={classes["paper"]}
          blur
          background="paper"
        >
          <Paper tag="header">
            <Typography variant="h4">Karting</Typography>
          </Paper>
          <div className={classes["content"]}>
            <Button
              isIcon
              focusable
              to="https://play.unity.com/mg/karting/a-beginner-s-project"
              className={classes["project-link"]}
            >
              <Avatar
                alt="Karting"
                src="https://play-static.unity.com/20191022/learn/images/bfe58c55-f24c-4889-b9db-d0b2a71951e0_Karting_Split_1800.png"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                Ce projet avait pour but de prendre en main Unity. Il avait
                aussi pour objectif de tester le Web Assembly. Je n'ai pas ??t??
                fort loin ??tant donn?? que le d??veloppement de jeux vid??os est un
                monde ?? part et qu'il n??cessite plusieurs domaines d'expertise
                ce qui m'aurait valut de consacrer bien plus de temps que je ne
                peux et ne veux y accorder.
              </Typography>
              <Typography variant="p">
                J'en garde toutefois une bonne exp??rience et esp??re que le WASM
                sera plus abouti et utilis?? ?? l'avenir.
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          tag="article"
          className={classes["paper"]}
          blur
          background="paper"
        >
          <Paper tag="header">
            <Typography variant="h4">RPG Assistant</Typography>
          </Paper>
          <div className={classes["content"]}>
            <Button
              isIcon
              focusable
              onClick={() => {
                dispatch(
                  runApplication({
                    aid: Applications.Image,
                    args: {
                      alt: "Lost",
                      src: "https://i.ibb.co/Mgydw0M/theme-clair.png"
                    }
                  })
                );
              }}
              className={classes["project-link"]}
            >
              <Avatar
                alt="RPG-Assistant"
                src="https://i.ibb.co/Mgydw0M/theme-clair.png"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                Ce projet est avant tout destin?? aux r??listes. C'est une
                application afin de les aider ?? Masteriser des parties ou ?? y
                jouer. Bien que le temps m'ait manqu?? pour continuer le
                d??veloppement, il est encore d'actualit??. Ici le projet est en
                cours de migration, car il a d'abords ??t?? d??velopp?? pour desktop
                sous Electron mais dans l'optique de le rendre plus accessible
                et plus flexible quant aux support des utilisateurs, j'en fais
                une application web.
              </Typography>
              <Typography variant="p">
                Je compte ??galement m'inspirer de ce port-folio afin de refaire
                la base de code du projet, dans le but qu'il soit plus souple et
                plus permissif. L'objectif est de faire en sorte que ce soit les
                utilisateurs qui imposent leur layout et choisissent leurs
                outils, et pas l'inverse. Ici les widgets sont dispos??s sous
                forme de grille, et je compte plut??t faire des fen??tres libres
                de d??placement et redimensionnables. De plus, comme chaque
                fen??tre est en soit consid??r?? comme un programme ( PID,
                arguments, shortcuts, etc ... ) il sera bien plus simple
                d'ajouter des fonctionnalit??s dans l'avenir.
              </Typography>
              <Typography variant="p">
                Encore une fois, si vous avez des questions n'h??sitez pas.
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          tag="article"
          className={classes["paper"]}
          blur
          background="paper"
        >
          <Paper tag="header">
            <Typography variant="h4">Randit</Typography>
          </Paper>
          <div className={classes["content"]}>
            <Button
              isIcon
              focusable
              className={classes["project-link"]}
              onClick={() =>
                dispatch(runApplication({ aid: Applications.Randit, args: {} }))
              }
            >
              <Avatar
                alt="Randit"
                src="https://i.ibb.co/6Ynwzrv/dice.png"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                Ce projet ??tait un petit projet afin de d??couvrir le framework
                Quasar, bas?? sur VueJS, et Firebase. Son principe consistait ??
                fournir des outils afin de g??n??rer de l'al??atoire, que ce soit
                des cl??s, une roue de la fortune, des lanc??s de d??s...
              </Typography>
              <Typography variant="p">
                L'approche ??tait mobile first et je n'ai pas encore impl??ment??
                le responsive donc sur desktop l'affichage est un brin trop
                large. Je ne compte pas l'impl??menter dans l'imm??diat, car
                J'investis le temps qui me reste sur l'application pour
                r??listes. Par ailleurs, j'ai vu ce que je voulais voir,
                c'est-??-dire ce que Firebase et Quasar pouvaient m'offrir.
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper
          tag="article"
          className={classes["paper"]}
          blur
          background="paper"
        >
          <Paper tag="header">
            <Typography variant="h4">Le reste...</Typography>
          </Paper>
          <div className={classes["content"]}>
            <Button
              isIcon
              focusable
              onClick={() => {
                dispatch(
                  runApplication({
                    aid: Applications.Image,
                    args: {
                      alt: "Lost",
                      src: "https://images.unsplash.com/photo-1515879128292-964efc3ebb25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2082&q=80"
                    }
                  })
                );
              }}
              className={classes["project-link"]}
            >
              <Avatar
                alt="Lost"
                src="https://images.unsplash.com/photo-1515879128292-964efc3ebb25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2082&q=80"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                Il y a ??norm??ment de projets que je ne peux montrer car soit
                r??serv??s, soit j'ai tout simplement perdu les fichiers, soit ces
                projets sont physiques ou enfin trop anciens.
              </Typography>
              <Typography variant="p">
                Parmis les projets perdus, on peut compter un utilitaire de
                communication pour le port s??rie ??crit en C# ( WPF ), des
                e-commerces, un site de soluce, des projets Raspi & arduino, une
                todo sur Xamarin ainsi qu'une sur Flutter et de nombreux
                autres...
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default memo(Projects);
