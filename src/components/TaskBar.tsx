import styles from "./TaskBar.module.scss";
import { useEffect, useState } from "react";
import { useRunningApplications } from "../data/RunningApplications";
import WindowApplication from "../shared/classes/WindowApplication";

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());
  const { runningApplications } = useRunningApplications();

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
        {runningApplications
          .filter((app) => app instanceof WindowApplication)
          .map((app) => (
            <button
              key={app.id}
              onClick={() => {
                (app as WindowApplication).minimized = false;
                (app as WindowApplication).sendToFront();
              }}
            >
              <img
                src={(app as WindowApplication).icon}
                alt={(app as WindowApplication).displayName}
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
