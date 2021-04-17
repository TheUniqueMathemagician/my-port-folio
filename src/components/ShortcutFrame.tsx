import { useSelector } from "../hooks/Store";
import Shortcut from "./Shortcut";
import styles from "./ShortcutFrame.module.scss";

const ShortcutFrame = () => {
  const applications = useSelector((state) => state.applications);
  return (
    <div className={styles["shortcut-frame"]}>
      {applications
        .filter((app) => app.shortcut)
        .map((app) => (
          <Shortcut application={app} key={app.id}></Shortcut>
        ))}
    </div>
  );
};

export default ShortcutFrame;
