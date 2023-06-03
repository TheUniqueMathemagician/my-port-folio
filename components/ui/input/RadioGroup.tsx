import { FunctionComponent, PropsWithChildren, memo } from "react"
import classes from "./RadioGroup.module.scss"

type Props = PropsWithChildren

const RadioGroup: FunctionComponent<Props> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default memo(RadioGroup)
