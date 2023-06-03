import { FunctionComponent, PropsWithChildren, memo } from "react"
import styles from "./WorkspaceFrame.module.scss"

type Props = PropsWithChildren<{}>

const WorkspaceFrame: FunctionComponent<Props> = ({ children }) => <div className={styles["workspace-frame"]}>{children}</div>

export default memo(WorkspaceFrame)
