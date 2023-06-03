import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./ButtonGroup.module.scss"

type Props = PropsWithChildren

const ButtonGroup: FunctionComponent<Props> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default ButtonGroup
