import { FunctionComponent, KeyboardEvent, memo, useCallback } from "react";
import { useDispatch, useSelector } from "../hooks/Store";
import { runApplication } from "../store/slices/Applications";
import styles from "./Shortcut.module.scss";
interface IProps {
  aid: number;
}

const Shortcut: FunctionComponent<IProps> = (props) => {
  const { aid } = props;
  const dispatch = useDispatch();

  const application = useSelector((store) => store.applications.pool[aid]);

  const handleDoubleClick = useCallback(() => {
    dispatch(runApplication({ aid, args: {} }));
  }, [aid, dispatch]);

  return (
    <button
      className={styles["shortcut"]}
      onDoubleClick={handleDoubleClick}
      onKeyPress={(e: KeyboardEvent) => {
        switch (e.code) {
          case "Enter":
          case "Space":
            dispatch(runApplication({ aid, args: {} }));
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
