import { useRef, useState, memo, FunctionComponent, RefObject } from "react";

import styles from "./TaskBar.module.scss";
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
import { Button, makeStyles, Theme } from "@material-ui/core";
import TaskBarTimeDate from "./TaskBarTimeDate";
import MenuIcon from "./icons/Menu";

const useStyles = makeStyles((theme: Theme) => ({
  taskBarButton: {
    alignItems: "center",
    background: "none",
    border: 0,
    borderRadius: 0,
    color: `white`,
    outline: 0,
    height: "100%",
    padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
    "&:hover": {
      backgroundColor: "#ffffff20"
    },
    "& img": {
      width: "2rem",
      height: "2rem"
    }
  },
  taskBarMenuButton: {
    alignItems: "center",
    background: "none",
    border: 0,
    borderRadius: 0,
    color: `white`,
    outline: 0,
    height: "100%",
    padding: theme.spacing(2),
    width: "100%",
    "&:hover": {
      backgroundColor: "#ffffff20"
    },
    "& > span": {
      display: "grid",
      columnGap: theme.spacing(2),
      gridTemplateColumns: "auto 1fr",
      textAlign: "left",
      "& img": {
        width: "2rem",
        height: "2rem"
      },
      "& span": {
        wordBreak: "keep-all",
        whiteSpace: "nowrap",
        color: "white"
      }
    }
  }
}));

interface ITaskBarButtonProps {
  onClick?: () => void;
  cref?: RefObject<HTMLButtonElement>;
  disabled?: boolean;
  tabIndex?: number;
}

const TaskBarButton: FunctionComponent<ITaskBarButtonProps> = (props) => {
  const classes = useStyles();
  const { children, cref, ...others } = props;
  return (
    <Button
      size="small"
      {...others}
      className={classes.taskBarButton}
      ref={cref}
    >
      {children}
    </Button>
  );
};

interface ITaskBarMenuButtonProps {
  alt?: string;
  onClick?: () => void;
  ref?: RefObject<HTMLButtonElement>;
  disabled?: boolean;
  tabIndex?: number;
  startIcon?: string;
}

const TaskBarMenuButton: FunctionComponent<ITaskBarMenuButtonProps> = (
  props
) => {
  const classes = useStyles();
  const { alt, children, startIcon, ...others } = props;
  return (
    <Button
      startIcon={startIcon && <img alt={alt} src={startIcon}></img>}
      size="small"
      {...others}
      className={classes.taskBarMenuButton}
    >
      {children}
    </Button>
  );
};

const TaskBar = () => {
  const [mainShown, setMainShown] = useState<boolean>(false);
  const [langShown, setLangShown] = useState<boolean>(false);
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

  return (
    <>
      <div className={styles["task-bar"]} ref={taskBarRef}>
        <TaskBarButton onClick={() => setMainShown(!mainShown)}>
          <MenuIcon style={{ width: "2rem", height: "2rem" }}></MenuIcon>
        </TaskBarButton>
        <Divider inset margin vertical></Divider>
        <div className={styles["apps"]}>
          {Object.keys(instances)
            .map((x) => instances[x])
            .filter((app) => app.type === "window")
            .map((application) => (
              <TaskBarButton
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
          cref={langButtonRef}
          onClick={() => setLangShown(!langShown)}
        >
          Français
        </TaskBarButton>
        <Divider inset margin vertical></Divider>
        <TaskBarButton disabled>
          <TaskBarTimeDate></TaskBarTimeDate>
        </TaskBarButton>
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
                <TaskBarMenuButton
                  startIcon={applications[key].icon}
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
                >
                  {applications[key].displayName}
                </TaskBarMenuButton>
              </li>
            ))}
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <TaskBarMenuButton
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
            </TaskBarMenuButton>
          </li>
          <li>
            <TaskBarMenuButton
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
            </TaskBarMenuButton>
          </li>
          <li>
            <TaskBarMenuButton
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
            </TaskBarMenuButton>
          </li>
        </ul>
        <Divider inset margin></Divider>
        <ul>
          <li>
            <TaskBarMenuButton
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/lock");
              }}
            >
              Verouiller
            </TaskBarMenuButton>
          </li>
          <li>
            <TaskBarMenuButton
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
            </TaskBarMenuButton>
          </li>
          <li>
            <TaskBarMenuButton
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
            </TaskBarMenuButton>
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
            <TaskBarMenuButton
              onClick={() => {
                setLangShown(false);
              }}
            >
              Français
            </TaskBarMenuButton>
          </li>
        </ul>
      </TaskBarMenu>
    </>
  );
};

export default memo(TaskBar);

// TODO: Add colors for the lasts 3 TaskBarButtons
