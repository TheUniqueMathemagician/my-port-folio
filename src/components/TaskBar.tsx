import { useRef, useState, memo, FunctionComponent, RefObject } from "react";

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

interface ITaskBarButtonProps {
  cref?: RefObject<HTMLButtonElement>;
  disabled?: boolean;
  onClick?: () => void;
  small?: boolean;
  startIcon?: boolean;
  endIcon?: boolean;
  tabIndex?: number;
  fullWidth?: boolean;
  align?: "start" | "center" | "end";
}

const TaskBarButton: FunctionComponent<ITaskBarButtonProps> = (props) => {
  const {
    align,
    small,
    children,
    cref,
    startIcon,
    endIcon,
    fullWidth,
    ...others
  } = props;
  const classNames = [classes["menu-button"]];
  if (startIcon) {
    classNames.push(classes["has-start-img"]);
  }
  if (endIcon) {
    classNames.push(classes["has-end-img"]);
  }
  if (small) {
    classNames.push(classes["small"]);
  }
  switch (align) {
    case "center":
      classNames.push(classes["align--center"]);
      break;
    case "end":
      classNames.push(classes["align--end"]);
      break;
    case "start":
      classNames.push(classes["align--start"]);
      break;
    default:
      break;
  }
  if (fullWidth) {
    classNames.push(classes["full-width"]);
  }
  return (
    <button {...others} className={classNames.join(" ")} ref={cref}>
      {children}
    </button>
  );
};

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
        <TaskBarButton small onClick={() => setMainShown(!mainShown)}>
          <MenuIcon></MenuIcon>
        </TaskBarButton>
        <Divider inset margin vertical></Divider>
        <div className={classes["apps"]}>
          {Object.keys(instances)
            .map((x) => instances[x])
            .filter((app) => app.type === "window")
            .map((application) => (
              <TaskBarButton
                small
                key={application.id}
                onClick={() => {
                  if (application.type === "window") {
                    dispatch(setMinimized({ application, minimized: false }));
                    dispatch(sendToFront(application));
                  }
                }}
              >
                <img src={application.icon} alt={application.displayName} />
              </TaskBarButton>
            ))}
        </div>
        <Divider inset margin vertical></Divider>
        <TaskBarButton
          small
          cref={langButtonRef}
          onClick={() => setLangShown(!langShown)}
        >
          Français
        </TaskBarButton>
        <Divider inset margin vertical></Divider>
        <TaskBarButton small disabled>
          <TaskBarTimeDate></TaskBarTimeDate>
        </TaskBarButton>
      </div>
      <TaskBarMenu
        shown={mainShown}
        position={{
          bottom: (taskBarRef.current?.clientHeight ?? 0) + 1,
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
                <TaskBarButton
                  tabIndex={mainShown ? 0 : -1}
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
                </TaskBarButton>
              </li>
            ))}
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
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
            </TaskBarButton>
          </li>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
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
            </TaskBarButton>
          </li>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
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
            </TaskBarButton>
          </li>
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/lock");
              }}
            >
              Verouiller
            </TaskBarButton>
          </li>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/lock");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
            >
              Se déconnecter
            </TaskBarButton>
          </li>
          <li>
            <TaskBarButton
              align="start"
              fullWidth
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/boot");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
            >
              Éteindre
            </TaskBarButton>
          </li>
        </ul>
      </TaskBarMenu>
      <TaskBarMenu
        shown={langShown}
        position={{
          bottom: (taskBarRef.current?.clientHeight ?? 0) + 1,
          left: langButtonRef.current?.offsetLeft ?? 0,
          right: 0,
          top: null
        }}
      >
        <ul>
          <li>
            <TaskBarButton
              fullWidth
              onClick={() => {
                setLangShown(false);
              }}
            >
              Français
            </TaskBarButton>
          </li>
        </ul>
      </TaskBarMenu>
    </>
  );
};

export default memo(TaskBar);

// TODO: Add colors for the lasts 3 TaskBarButtons
