import WindowInstance from "../data/classes/WindowInstance";
import { useEffect, useRef, useState } from "react";
import { useInstances } from "../data/Instances";

import styles from "./TaskBar.module.scss";
import TaskBarMenu from "./TaskBarMenu";
import { useApplications } from "../data/Applications";
import { useHistory } from "react-router";

const TaskBar = () => {
  const [date, setDate] = useState<number>(Date.now());
  const [mainShown, setMainShown] = useState<boolean>(false);
  const [langShown, setLangShown] = useState<boolean>(false);
  const { instances } = useInstances();
  const taskBarRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const { applications } = useApplications();
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _time = new Date(date).toLocaleTimeString().slice(0, -3);

  const _date = new Date(date)
    .toLocaleDateString()
    .split("/")
    .map((x) => x.match(/\d{2}$/))
    .join("/");

  return (
    <>
      <div className={styles["task-bar"]} ref={taskBarRef}>
        <button onClick={() => setMainShown(!mainShown)}>
          <img src={require("../assets/images/menu.svg").default} alt="Menu" />
        </button>
        <hr></hr>
        <div className={styles["apps"]}>
          {instances
            .filter((app) => app instanceof WindowInstance)
            .map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  (app as WindowInstance).minimized = false;
                  (app as WindowInstance).sendToFront();
                }}
              >
                <img
                  src={(app as WindowInstance).icon}
                  alt={(app as WindowInstance).displayName}
                />
              </button>
            ))}
        </div>
        <hr></hr>
        <button ref={langButtonRef} onClick={() => setLangShown(!langShown)}>
          Français
        </button>
        <hr />
        <button disabled>
          <div>
            <p>{_time}</p>
            <p>{_date}</p>
          </div>
        </button>
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
          {applications
            .filter((app) => !!app.shortcut)
            .map((app) => (
              <li>
                <button
                  tabIndex={mainShown ? 0 : -1}
                  onClick={() => {
                    app.run();
                    setMainShown(false);
                  }}
                >
                  <img src={app.icon} alt={app.displayName} />
                  <span>{app.displayName}</span>
                </button>
              </li>
            ))}
        </ul>
        <hr />
        <ul>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                setMainShown(false);
              }}
            >
              Profil
            </button>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                applications[0].run();
                setMainShown(false);
              }}
            >
              Applications
            </button>
          </li>
        </ul>
        <hr />
        <ul>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/lock");
              }}
            >
              Se déconnecter
            </button>
          </li>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/lock");
              }}
            >
              Verouiller
            </button>
          </li>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                history.push("/boot");
              }}
            >
              Éteindre
            </button>
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
            <button
              onClick={() => {
                setLangShown(false);
              }}
            >
              Français
            </button>
          </li>
        </ul>
      </TaskBarMenu>
    </>
  );
};

export default TaskBar;
