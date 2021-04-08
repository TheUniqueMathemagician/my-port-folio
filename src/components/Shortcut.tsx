import { KeyboardEvent } from "react";
import DaemonApplication from "../data/classes/DaemonApplication";
import WindowApplication from "../data/classes/WindowApplication";
import styles from "./Shortcut.module.scss";

interface IProps {
  application: DaemonApplication | WindowApplication;
}

const Shortcut: React.FunctionComponent<IProps> = ({ application }) => {
  return (
    <button
      className={styles["shortcut"]}
      onDoubleClick={() => application.run()}
      onKeyPress={(e: KeyboardEvent) => {
        switch (e.code) {
          case "Enter":
          case "Space":
            application.run();
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
