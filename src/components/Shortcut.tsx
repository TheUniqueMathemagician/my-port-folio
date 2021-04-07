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
    >
      <figure>
        <img src={application.icon} alt={application.displayName} />
        <figcaption>{application.displayName}</figcaption>
      </figure>
    </button>
  );
};

export default Shortcut;
