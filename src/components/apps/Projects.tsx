import classes from "./Projects.module.scss";
import { FunctionComponent, memo } from "react";
import Typography from "../UI/Typography";
import Avatar from "../UI/Avatar";
import Paper from "../UI/Paper";
import Button from "../UI/Input/Button";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication, WindowInstance } from "../../store/reducers/Instances";

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

  const small = useSelector(
    (store) =>
      (store.instances.elements[pid] as WindowInstance).dimensions.width ??
      0 < 600
  );
  const contact = useSelector(
    (store) =>
      store.applications.elements[
        Object.keys(store.applications.elements).find(
          (key) => store.applications.elements[key].displayName === "Contact"
        ) ?? ""
      ]
  );
  const image = useSelector(
    (store) =>
      store.applications.elements[
        Object.keys(store.applications.elements).find(
          (key) => store.applications.elements[key].displayName === "Image"
        ) ?? ""
      ]
  );
  const randit = useSelector(
    (store) =>
      store.applications.elements[
        Object.keys(store.applications.elements).find(
          (key) => store.applications.elements[key].displayName === "Randit"
        ) ?? ""
      ]
  );

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
                    application: image,
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
                L'image affichée vient d'une version précédente de ce
                port-folio.
              </Typography>
              <Typography variant="p">
                Ce projet a compté plusieurs versions, chacune basée sur des
                technologies différentes et des concepts à part. Au final, j'ai
                décidé d'apprendre React et perfectionner TypeScript en le
                faisant.
              </Typography>
              <Typography variant="p">
                Il m'a permis d'en apprendre plus sur react (memoization,
                profiler, HOC, render props, etc...), plus sur Typescript
                (interfaces, énumérations, Omit, union types, etc...) et redux.
                J'ai d'abord été très réticent à l'utilisation de redux, surtout
                dû à sa syntaxe peu avenante, et puis je suis tombé sur
                redux/toolkit qui m'a fait changer d'avis. J'avais avant tout
                besoin d'une solution de state management car l'application
                commençait à devenir complexe. J'ai testé d'autres solutions
                mais celle-ci s'est avérée être plus que suffisante et
                relativement efficace (bien que je n'adhère pas l'approche du
                flux unidirectionnel de redux).
              </Typography>
              <Typography variant="p">
                Au départ, j'avais utilisé plusieurs librairies, notamment
                material UI pour l'interface. J'ai finalement choisi de faire
                toute l'application avec mes petites mains car le but était
                surtout de montrer ce que je savais faire, et non ce que les
                autres savent faire.
              </Typography>
              <Typography variant="p">
                Pour rester bref, je vais m'arrêter là. Si
                <span
                  className={classes["link"]}
                  onClick={() => {
                    dispatch(
                      runApplication({ application: contact, args: {} })
                    );
                  }}
                >
                  &nbsp;vous avez des questions&nbsp;
                </span>
                n'hésitez pas.
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
                aussi pour objectif de tester le Web Assembly. Je n'ai pas été
                fort loin étant donné que le développement de jeux vidéos est un
                monde à part et qu'il nécessite plusieurs domaines d'expertise
                ce qui m'aurait valut de consacrer bien plus de temps que je ne
                peux et ne veux y accorder.
              </Typography>
              <Typography variant="p">
                J'en garde toutefois une bonne expérience et espère que le WASM
                sera plus abouti et utilisé à l'avenir.
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
                    application: image,
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
                Ce projet est avant tout destiné aux rôlistes. C'est une
                application afin de les aider à Masteriser des parties ou à y
                jouer. Bien que le temps m'ait manqué pour continuer le
                développement, il est encore d'actualité. Ici le projet est en
                cours de migration, car il a d'abords été développé pour desktop
                sous Electron mais dans l'optique de le rendre plus accessible
                et plus flexible quant aux support des utilisateurs, j'en fais
                une application web.
              </Typography>
              <Typography variant="p">
                Je compte également m'inspirer de ce port-folio afin de refaire
                la base de code du projet, dans le but qu'il soit plus souple et
                plus permissif. L'objectif est de faire en sorte que ce soit les
                utilisateurs qui imposent leur layout et choisissent leurs
                outils, et pas l'inverse. Ici les widgets sont disposés sous
                forme de grille, et je compte plutôt faire des fenêtres libres
                de déplacement et redimensionnables. De plus, comme chaque
                fenêtre est en soit considéré comme un programme ( PID,
                arguments, shortcuts, etc ... ) il sera bien plus simple
                d'ajouter des fonctionnalités dans l'avenir.
              </Typography>
              <Typography variant="p">
                Encore une fois, si vous avez des questions n'hésitez pas.
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
                dispatch(runApplication({ application: randit, args: {} }))
              }
            >
              <Avatar
                alt="Randit"
                src="https://i.ibb.co/6Ynwzrv/dice.png"
              ></Avatar>
            </Button>
            <div>
              <Typography variant="p">
                Ce projet était un petit projet afin de découvrir le framework
                Quasar, basé sur VueJS, et Firebase. Son principe consistait à
                fournir des outils afin de générer de l'aléatoire, que ce soit
                des clés, une roue de la fortune, des lancés de dés...
              </Typography>
              <Typography variant="p">
                L'approche était mobile first et je n'ai pas encore implémenté
                le responsive donc sur desktop l'affichage est un brin trop
                large. Je ne compte pas l'implémenter dans l'immédiat, car
                J'investis le temps qui me reste sur l'application pour
                rôlistes. Par ailleurs, j'ai vu ce que je voulais voir,
                c'est-à-dire ce que Firebase et Quasar pouvaient m'offrir.
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
                    application: image,
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
                Il y a énormément de projets que je ne peux montrer car soit
                réservés, soit j'ai tout simplement perdu les fichiers, soit ces
                projets sont physiques ou enfin trop anciens.
              </Typography>
              <Typography variant="p">
                Parmis les projets perdus, on peut compter un utilitaire de
                communication pour le port série écrit en C# ( WPF ), des
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
