import { FunctionComponent } from "react";

import styles from "./DesktopFrame.module.scss";

const DesktopFrame: FunctionComponent = ({ children }) => {
  return <main className={styles["desktop-frame"]}>{children}</main>;
};

export default DesktopFrame;
