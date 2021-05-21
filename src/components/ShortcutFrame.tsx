import { memo } from "react";
import { useSelector } from "../hooks/Store";
import Shortcut from "./Shortcut";
import styles from "./ShortcutFrame.module.scss";

const ShortcutFrame = () => {
  const aids = useSelector((store) =>
    Object.keys(store.applications.pool)
      .filter((key) => store.applications.pool[+key].shortcut)
      .map((key) => +key)
  );

  return (
    <div className={styles["root"]}>
      {aids.map((aid) => (
        <Shortcut aid={aid} key={aid}></Shortcut>
      ))}
    </div>
  );
};

export default memo(ShortcutFrame);
