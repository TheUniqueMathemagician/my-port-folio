import styles from "./ScreenFrame.module.scss";
import { useSelector } from "../hooks/Store";
import { FunctionComponent } from "react";

const ScreenFrame: FunctionComponent = ({ children }) => {
  const bg = useSelector((store) => store.theme.workspaceBackgroundURL);

  return (
    <div
      style={{ background: `url(${bg})` }}
      className={styles["screen-frame"]}
    >
      {children}
    </div>
  );
};

export default ScreenFrame;
