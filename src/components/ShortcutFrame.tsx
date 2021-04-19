import { useSelector } from "../hooks/Store";
import Shortcut from "./Shortcut";
import styles from "./ShortcutFrame.module.scss";

const ShortcutFrame = () => {
  const applications = useSelector((state) => state.applications);
  return (
    <div className={styles["shortcut-frame"]}>
      {Object.keys(applications)
        .filter((key) => applications[key].shortcut)
        .map((key) => (
          <Shortcut application={applications[key]} key={key}></Shortcut>
        ))}
    </div>
  );
};

export default ShortcutFrame;
