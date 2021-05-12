import { useSelector } from "../hooks/Store";
import Shortcut from "./Shortcut";
import styles from "./ShortcutFrame.module.scss";

const ShortcutFrame = () => {
  const keys = useSelector((store) =>
    Object.keys(store.applications.elements).filter(
      (key) => store.applications.elements[key].shortcut
    )
  );
  return (
    <div className={styles["shortcut-frame"]}>
      {keys.map((key) => (
        <Shortcut aid={key} key={key}></Shortcut>
      ))}
    </div>
  );
};

export default ShortcutFrame;
