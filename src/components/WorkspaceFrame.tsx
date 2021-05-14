import styles from "./WorkspaceFrame.module.scss";
import React, { memo, PropsWithChildren } from "react";

interface IProps {}

const WorkspaceFrame: React.FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <div className={styles["workspace-frame"]}>{children}</div>;
};

export default memo<PropsWithChildren<IProps>>(WorkspaceFrame);
