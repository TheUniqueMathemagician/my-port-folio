import React, {FC, memo} from "react";
import styles from "./WorkspaceFrame.module.scss";

const WorkspaceFrame: FC = ({children}) => <div className={styles["workspace-frame"]}>{children}</div>;

export default memo(WorkspaceFrame);
