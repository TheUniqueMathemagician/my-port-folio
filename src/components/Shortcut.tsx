import { FunctionComponent, KeyboardEvent, memo, useCallback } from "react";
import { useDispatch, useSelector } from "../hooks/Store";
import { runApplication } from "../store/reducers/Instances";
import styles from "./Shortcut.module.scss";
interface IProps {
  aid: string;
}

const Shortcut: FunctionComponent<IProps> = (props) => {
  const { aid } = props;
  const dispatch = useDispatch();

  const application = useSelector((store) => store.applications.elements[aid]);

  const handleDoubleClick = useCallback(() => {
    dispatch(runApplication({ application, args: {} }));
  }, [application, dispatch]);

  return (
    <button
      className={styles["shortcut"]}
      onDoubleClick={handleDoubleClick}
      onKeyPress={(e: KeyboardEvent) => {
        switch (e.code) {
          case "Enter":
          case "Space":
            dispatch(runApplication({ application, args: {} }));
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

export default memo(Shortcut);
