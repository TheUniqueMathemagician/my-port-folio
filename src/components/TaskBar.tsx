import styles from "./TaskBar.module.scss";
import { useEffect, useState } from "react";
import { useOpenedApplications } from "../data/OpenedApplications";

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());
  const { openedApplications } = useOpenedApplications();

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
        {openedApplications
          .filter((app) => app.minimized)
          .map((app) => (
            <button key={app.id} onClick={() => (app.minimized = false)}>
              <img src={app.icon} alt={app.name} />
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
