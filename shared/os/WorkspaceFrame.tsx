import { FC, memo, PropsWithChildren } from "react"
import styles from "./WorkspaceFrame.module.scss"

type Props = PropsWithChildren<{}>

const WorkspaceFrame: FC<Props> = ({ children }) => <div className={styles["workspace-frame"]}>{children}</div>

export default memo(WorkspaceFrame)
