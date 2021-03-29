import styles from "./TaskBar.module.scss";
import { useEffect, useState } from "react";
import { useOpenedApplications } from "../data/OpenedApplications";

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());
  const [applications] = useOpenedApplications();

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
        {applications
          .filter((application) => application.minimized)
          .map((application) => (
            <button
              key={application.id}
              onClick={() => (application.minimized = false)}
            >
              {application.name}
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
