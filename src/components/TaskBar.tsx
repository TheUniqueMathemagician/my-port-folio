import styles from "./TaskBar.module.scss";
import { useEffect, useState } from "react";
import { useInstances } from "../data/Instances";
import WindowInstance from "../data/classes/WindowInstance";

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());
  const { instances } = useInstances();

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
    <div className={styles["task-bar"]}>
      <div className={styles.apps}>
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
      <button disabled className="language">
        Français
      </button>
      <button disabled>
        <p>{_time}</p>
        <p>{_date}</p>
      </button>
    </div>
  );
};

export default TaskBar;
