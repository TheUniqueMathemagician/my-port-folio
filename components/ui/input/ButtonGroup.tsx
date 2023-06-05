import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./ButtonGroup.module.scss"

type ButtonGroupProps = PropsWithChildren

const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default ButtonGroup
