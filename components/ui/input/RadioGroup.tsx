import { FunctionComponent, PropsWithChildren, memo } from "react"
import classes from "./RadioGroup.module.scss"

type RadioGroupProps = PropsWithChildren

const RadioGroup: FunctionComponent<RadioGroupProps> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default memo(RadioGroup)
