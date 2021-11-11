import React, {FC, memo, PropsWithChildren} from "react";
import styles from "./WorkspaceFrame.module.scss";

const WorkspaceFrame: FC = ({children}) => <div className={styles["workspace-frame"]}>{children}</div>;

export default memo<PropsWithChildren<{}>>(WorkspaceFrame);
