import { FC, memo, ReactNode } from "react"
import styles from "./WorkspaceFrame.module.scss"

type Props = {
	children: ReactNode
}

const WorkspaceFrame: FC<Props> = ({ children }) => <div className={styles["workspace-frame"]}>{children}</div>

export default memo<Props>(WorkspaceFrame)
