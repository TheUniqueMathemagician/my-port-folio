import { useRef, useState, memo } from "react";

import classes from "./TaskBar.module.scss";
import TaskBarMenu from "./TaskBarMenu";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "../hooks/Store";
import {
  closeApplication,
  runApplication,
  sendToFront
} from "../store/reducers/Instances";
import { setMinimized } from "../store/reducers/Instances";
import Divider from "./UI/Divider";
import { setHasRanStartupApplications } from "../store/reducers/OS";
import TaskBarTimeDate from "./TaskBarTimeDate";
import MenuIcon from "./icons/Menu";
import { EColorScheme } from "../types/EColorScheme";
import Button from "./UI/Button";

const TaskBar = () => {
  const [mainShown, setMainShown] = useState<boolean>(false);
  const [langShown, setLangShown] = useState<boolean>(false);

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );
  const instances = useSelector(
    (store) => store.instances.elements,
    (left, right) => {
      for (const key in left) {
        const leftItem = left[key];
        const rightItem = right[key];
        if (leftItem?.displayName !== rightItem?.displayName) return false;
      }
      if (Object.keys(left)?.length !== Object.keys(right)?.length)
        return false;
      return true;
    }
  );
  const applications = useSelector(
    (store) => store.applications,
    (left, right) => {
      for (const key in left) {
        const leftItem = left[key];
        const rightItem = right[key];
        if (leftItem?.displayName !== rightItem?.displayName) return false;
      }
      if (Object.keys(left)?.length !== Object.keys(right)?.length)
        return false;
      return true;
    }
  );

  const taskBarRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const rootClasses = [classes["root"]];

  if (contrast) rootClasses.push(classes["contrast"]);

  return (
    <>
      <div className={rootClasses.join(" ")} ref={taskBarRef}>
        <Button size="md" onClick={() => setMainShown(!mainShown)}>
          <MenuIcon></MenuIcon>
        </Button>
        <Divider inset margin vertical></Divider>
        <div className={classes["apps"]}>
          {Object.keys(instances)
            .map((x) => instances[x])
            .filter((app) => app.type === "window")
            .map((application) => (
              <Button
                size="md"
                key={application.id}
                onClick={() => {
                  if (application.type === "window") {
                    dispatch(setMinimized({ application, minimized: false }));
                    dispatch(sendToFront(application));
                  }
                }}
              >
                <img src={application.icon} alt={application.displayName} />
              </Button>
            ))}
        </div>
        <Divider inset margin vertical></Divider>
        <Button
          size="lg"
          ripple
          ref={langButtonRef}
          onClick={() => setLangShown(!langShown)}
        >
          Français
        </Button>
        <Divider inset margin vertical></Divider>
        <Button size="md" disabled ripple>
          <TaskBarTimeDate></TaskBarTimeDate>
        </Button>
      </div>
      <TaskBarMenu
        shown={mainShown}
        position={{
          bottom: taskBarRef.current?.clientHeight ?? 0,
          left: 0,
          right: null,
          top: null
        }}
      >
        <ul>
          {Object.keys(applications)
            .filter((key) => !!applications[key].shortcut)
            .map((key) => (
              <li key={key}>
                <Button
                  ripple
                  size="lg"
                  focusable={mainShown}
                  onClick={() => {
                    dispatch(
                      runApplication({
                        application: applications[key],
                        args: {}
                      })
                    );
                    setMainShown(false);
                  }}
                  startIcon
                  align="start"
                  fullWidth
                >
                  <img
                    alt={applications[key].displayName}
                    src={applications[key].icon}
                  ></img>
                  <span>{applications[key].displayName} </span>
                </Button>
              </li>
            ))}
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <Button
              align="start"
              fullWidth
              size="lg"
              ripple
              focusable={mainShown}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[0]],
                    args: { tab: "profile" }
                  })
                );
                setMainShown(false);
              }}
            >
              Profil
            </Button>
          </li>
          <li>
            <Button
              align="start"
              fullWidth
              size="lg"
              ripple
              focusable={mainShown}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[0]],
                    args: {}
                  })
                );
                setMainShown(false);
              }}
            >
              Paramètres
            </Button>
          </li>
          <li>
            <Button
              align="start"
              fullWidth
              ripple
              size="lg"
              focusable={mainShown}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[1]],
                    args: {}
                  })
                );
                setMainShown(false);
              }}
            >
              Applications
            </Button>
          </li>
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <Button
              align="start"
              fullWidth
              size="lg"
              ripple
              focusable={mainShown}
              onClick={() => {
                history.push("/lock");
              }}
            >
              Verouiller
            </Button>
          </li>
          <li>
            <Button
              align="start"
              fullWidth
              size="lg"
              ripple
              focusable={mainShown}
              onClick={() => {
                history.push("/lock");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
            >
              Se déconnecter
            </Button>
          </li>
          <li>
            <Button
              align="start"
              fullWidth
              size="lg"
              ripple
              focusable={mainShown}
              onClick={() => {
                history.push("/boot");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
            >
              Éteindre
            </Button>
          </li>
        </ul>
      </TaskBarMenu>
      <TaskBarMenu
        shown={langShown}
        position={{
          bottom: taskBarRef.current?.clientHeight ?? 0,
          left: langButtonRef.current?.offsetLeft ?? 0,
          right: 0,
          top: null
        }}
      >
        <ul>
          <li>
            <Button
              fullWidth
              size="lg"
              ripple
              onClick={() => {
                setLangShown(false);
              }}
            >
              Français
            </Button>
          </li>
        </ul>
      </TaskBarMenu>
    </>
  );
};

export default memo(TaskBar);

// TODO: Add colors for the lasts 3 Buttons
