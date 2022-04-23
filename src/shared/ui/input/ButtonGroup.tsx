import { FC } from "react"
import classes from "./ButtonGroup.module.scss"

type Props = {
	children: React.ReactNode
}

const ButtonGroup: FC<Props> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default ButtonGroup
