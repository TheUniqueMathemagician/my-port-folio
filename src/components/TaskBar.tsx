import { useEffect, useRef, useState, memo } from "react";

import styles from "./TaskBar.module.scss";
import TaskBarMenu from "./TaskBarMenu";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "../hooks/Store";
import { runApplication, sendToFront } from "../store/reducers/Instances";
import { setMinimized } from "../store/reducers/Instances";

const TaskBar = () => {
  const [date, setDate] = useState<number>(Date.now());
  const [mainShown, setMainShown] = useState<boolean>(false);
  const [langShown, setLangShown] = useState<boolean>(false);
  const instances = useSelector((store) => store.instances.elements);
  const applications = useSelector((store) => store.applications);
  const taskBarRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const history = useHistory();
  const dispatch = useDispatch();

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
          {Object.keys(instances)
            .map((x) => instances[x])
            .filter((app) => app.type === "window")
            .map((application) => (
              <button
                key={application.id}
                onClick={() => {
                  if (application.type === "window") {
                    dispatch(setMinimized({ application, minimized: false }));
                    dispatch(sendToFront(application));
                  }
                }}
              >
                <img src={application.icon} alt={application.displayName} />
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
          {Object.keys(applications)
            .filter((key) => !!applications[key].shortcut)
            .map((key) => (
              <li key={key}>
                <button
                  tabIndex={mainShown ? 0 : -1}
                  onClick={() => {
                    dispatch(runApplication(applications[key]));
                    setMainShown(false);
                  }}
                >
                  <img
                    src={applications[key].icon}
                    alt={applications[key].displayName}
                  />
                  <span>{applications[key].displayName}</span>
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
          </li>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(runApplication(applications[keys[0]]));
                setMainShown(false);
              }}
            >
              Préférences
            </button>
          </li>
          <li>
            <button
              tabIndex={mainShown ? 0 : -1}
              onClick={() => {
                const keys = Object.keys(applications);
                dispatch(runApplication(applications[keys[1]]));
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

const arePropsEquals = () => false;

export default memo(TaskBar, arePropsEquals);
