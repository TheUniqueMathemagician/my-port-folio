import { FunctionComponent, KeyboardEvent, useCallback } from "react";
import { useDispatch } from "../hooks/Store";
import {
  DaemonApplication,
  WindowApplication
} from "../store/reducers/Applications";
import { runApplication } from "../store/reducers/Instances";
import styles from "./Shortcut.module.scss";
interface IProps {
  application: DaemonApplication | WindowApplication;
}

const Shortcut: FunctionComponent<IProps> = ({ application }) => {
  const dispatch = useDispatch();
  const handleDoubleClick = useCallback(() => {
    dispatch(runApplication(application));
  }, [application, dispatch]);

  return (
    <button
      className={styles["shortcut"]}
      onDoubleClick={handleDoubleClick}
      onKeyPress={(e: KeyboardEvent) => {
        switch (e.code) {
          case "Enter":
          case "Space":
            runApplication(application);
            break;
          default:
            break;
        }
      }}
    >
      <figure>
        <img src={application.icon} alt={application.displayName} />
        <figcaption>{application.displayName}</figcaption>
      </figure>
    </button>
  );
};

export default Shortcut;
