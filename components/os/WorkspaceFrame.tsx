import { FunctionComponent, PropsWithChildren, memo } from "react"
import styles from "./WorkspaceFrame.module.scss"

type WorkspaceFrameProps = PropsWithChildren

const WorkspaceFrame: FunctionComponent<WorkspaceFrameProps> = ({ children }) => <div className={styles["workspace-frame"]}>{children}</div>

export default memo(WorkspaceFrame)
