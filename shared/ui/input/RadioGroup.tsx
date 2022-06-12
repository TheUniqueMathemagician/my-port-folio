import { FC, memo, PropsWithChildren } from "react"
import classes from "./RadioGroup.module.scss"

type Props = PropsWithChildren<{}>

const RadioGroup: FC<Props> = ({ children }) => <div className={classes["root"]}>{children}</div>

export default memo<Props>(RadioGroup)
