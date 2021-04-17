import styles from "./WorkspaceFrame.module.scss";
import React from "react";

const WorkspaceFrame: React.FunctionComponent = ({ children }) => {
  return <div className={styles["workspace-frame"]}>{children}</div>;
};

export default WorkspaceFrame;
