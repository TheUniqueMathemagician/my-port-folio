import styles from "./WorkspaceFrame.module.scss";

const WorkspaceFrame: React.FunctionComponent = ({ children }) => {
  return <div className={styles["workspace-frame"]}>{children}</div>;
};

export default WorkspaceFrame;
