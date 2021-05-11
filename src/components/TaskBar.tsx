import { useRef, useState, memo, useCallback } from "react";

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
import Button from "./UI/Input/Button";
import {
  MdLock,
  MdMail,
  MdPhone,
  MdPowerSettingsNew,
  MdSend
} from "react-icons/md";

import { IoLogOutOutline } from "react-icons/io5";

enum EMenuShown {
  none,
  main,
  contact,
  language
}

const TaskBar = () => {
  const [menuShown, setMenuShown] = useState<EMenuShown>(EMenuShown.none);

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

  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const taskBarRef = useRef<HTMLDivElement>(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const closeMenu = useCallback(() => {
    setMenuShown(EMenuShown.none);
  }, []);

  const rootClasses = [classes["root"]];

  if (contrast) rootClasses.push(classes["contrast"]);

  //#region Menu position calculations

  // TOO: need fix

  // const contactMenuLeftPosition = 0;
  // const contactButton: HTMLButtonElement = contactButtonRef.current as HTMLButtonElement;
  // if (contactButton) {
  //   const clientWidth = contactButton.clientWidth;
  //   const offsetLeft = contactButton.offsetLeft;
  // }

  // const langMenuLeftPosition = 0;

  //#endregion

  return (
    <>
      <div className={rootClasses.join(" ")} ref={taskBarRef}>
        <Button
          size="md"
          focusable
          ripple
          onClick={() => {
            if (menuShown === EMenuShown.main) {
              closeMenu();
            } else {
              setMenuShown(EMenuShown.main);
            }
          }}
        >
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
                ripple
                focusable
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
          size="md"
          ripple
          focusable
          ref={contactButtonRef}
          onClick={() => {
            if (menuShown === EMenuShown.contact) {
              closeMenu();
            } else {
              setMenuShown(EMenuShown.contact);
            }
          }}
        >
          <MdSend></MdSend>
        </Button>
        <Divider inset margin vertical></Divider>
        <Button
          size="md"
          ripple
          focusable
          ref={langButtonRef}
          onClick={() => {
            if (menuShown === EMenuShown.language) {
              closeMenu();
            } else {
              setMenuShown(EMenuShown.language);
            }
          }}
        >
          Français
        </Button>
        <Divider inset margin vertical></Divider>
        <Button size="md" readOnly ripple>
          <TaskBarTimeDate></TaskBarTimeDate>
        </Button>
      </div>
      <TaskBarMenu
        shown={menuShown === EMenuShown.main}
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
                  size="md"
                  focusable={menuShown === EMenuShown.main}
                  onClick={() => {
                    dispatch(
                      runApplication({
                        application: applications[key],
                        args: {}
                      })
                    );
                    closeMenu();
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
              size="md"
              ripple
              focusable={menuShown === EMenuShown.main}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[0]],
                    args: { tab: "profile" }
                  })
                );
                closeMenu();
              }}
            >
              Profil
            </Button>
          </li>
          <li>
            <Button
              align="start"
              fullWidth
              size="md"
              ripple
              focusable={menuShown === EMenuShown.main}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[0]],
                    args: {}
                  })
                );
                closeMenu();
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
              size="md"
              focusable={menuShown === EMenuShown.main}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(
                  runApplication({
                    application: applications[keys[1]],
                    args: {}
                  })
                );
                closeMenu();
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
              color="success"
              focusable={menuShown === EMenuShown.main}
              fullWidth
              onClick={() => {
                history.push("/lock");
              }}
              ripple
              size="md"
              startIcon
            >
              <MdLock></MdLock>
              <span>Verouiller</span>
            </Button>
          </li>
          <li>
            <Button
              align="start"
              color="warning"
              focusable={menuShown === EMenuShown.main}
              fullWidth
              onClick={() => {
                history.push("/lock");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
              ripple
              size="md"
              startIcon
            >
              <IoLogOutOutline></IoLogOutOutline>
              <span>Se déconnecter</span>
            </Button>
          </li>
          <li>
            <Button
              align="start"
              color="error"
              focusable={menuShown === EMenuShown.main}
              fullWidth
              onClick={() => {
                history.push("/boot");
                Object.keys(instances).forEach((key) => {
                  dispatch(closeApplication(instances[key]));
                });
                dispatch(setHasRanStartupApplications(false));
              }}
              ripple
              size="md"
              startIcon
            >
              <MdPowerSettingsNew></MdPowerSettingsNew>
              <span>Éteindre</span>
            </Button>
          </li>
        </ul>
      </TaskBarMenu>
      <TaskBarMenu
        shown={menuShown === EMenuShown.contact}
        position={{
          bottom: taskBarRef.current?.clientHeight ?? 0,
          // left: contactMenuLeftPosition,
          left: null,
          right: 0,
          top: null
        }}
      >
        <ul>
          <li>
            <Button
              align="start"
              size="md"
              focusable={menuShown === EMenuShown.contact}
              fullWidth
              startIcon
              to="mailto: tamburrini.yannick@gmail.com"
              onClick={closeMenu}
            >
              <MdMail></MdMail>
              <span>tamburrini.yannick@gmail.com</span>
            </Button>
          </li>
          <li>
            <Button
              align="start"
              size="md"
              focusable={menuShown === EMenuShown.contact}
              fullWidth
              startIcon
              to="tel:+32 498 62 77 16"
              onClick={closeMenu}
            >
              <MdPhone></MdPhone>
              <span>+32 498 62 77 16</span>
            </Button>
          </li>
        </ul>
      </TaskBarMenu>
      <TaskBarMenu
        shown={menuShown === EMenuShown.language}
        position={{
          bottom: taskBarRef.current?.clientHeight ?? 0,
          // left: langMenuLeftPosition,
          left: null,
          right: 0,
          top: null
        }}
      >
        <ul>
          <li>
            <Button
              align="start"
              fullWidth
              focusable
              size="md"
              ripple
              onClick={closeMenu}
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
