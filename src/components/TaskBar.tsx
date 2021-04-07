import styles from "./TaskBar.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useInstances } from "../data/Instances";
import WindowInstance from "../data/classes/WindowInstance";
import { useApplications } from "../data/Applications";
import { useHistory } from "react-router";

const TaskBar = () => {
  const [date, setDate] = useState<number>(Date.now());
  const [menuShown, setMenuShown] = useState<boolean>(false);
  const [langShown, setLangShown] = useState<boolean>(false);
  const { instances } = useInstances();
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

  const handleMenuClick = useCallback(() => {
    setMenuShown(!menuShown);
  }, [menuShown]);

  const handleLangClick = useCallback(() => {
    setLangShown(!langShown);
  }, [langShown]);

  const handleDocumentClick = useCallback(() => {
    // setMenuShown(false);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick, menuShown]);

  const _time = new Date(date).toLocaleTimeString().slice(0, -3);

  const _date = new Date(date)
    .toLocaleDateString()
    .split("/")
    .map((x) => x.match(/\d{2}$/))
    .join("/");

  return (
    <div className={styles["task-bar"]}>
      <div className={styles["menu"]}>
        <nav className={menuShown ? styles["shown"] : ""}>
          <ul>
            {applications
              .filter((app) => !!app.shortcut)
              .map((app) => (
                <li>
                  <button
                    onClick={() => {
                      app.run();
                      setMenuShown(false);
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
            {/* TODO: Add map of actions / icons  */}
            <li>
              <button
                onClick={() => {
                  history.push("/lock");
                }}
              >
                Se déconnecter
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/lock");
                }}
              >
                Verouiller
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  history.push("/boot");
                }}
              >
                Éteindre
              </button>
            </li>
          </ul>
        </nav>
        <button onClick={handleMenuClick}>
          <img src={require("../assets/images/menu.svg").default} alt="Menu" />
        </button>
      </div>
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
      <div className={styles["menu"]}>
        <nav className={langShown ? styles["shown"] : ""}>
          <ul>
            <li>
              <button onClick={() => setLangShown(false)}>Français</button>
            </li>
          </ul>
        </nav>
        <button className="language" onClick={handleLangClick}>
          Français
        </button>
      </div>
      <hr />
      <button disabled>
        <div>
          <p>{_time}</p>
          <p>{_date}</p>
        </div>
      </button>
    </div>
  );
};

export default TaskBar;
