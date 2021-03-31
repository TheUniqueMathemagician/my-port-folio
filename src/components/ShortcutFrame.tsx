import { useApplications } from "../data/Applications";
import Shortcut from "./Shortcut";
import styles from "./ShortcutFrame.module.scss";

interface IProps {}

const ShortcutFrame: React.FunctionComponent<IProps> = ({ children }) => {
  const { applications } = useApplications();
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
