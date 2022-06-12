import { FC, ReactNode } from "react"
import classes from "./TableFoot.module.scss"

type Props = {
	children: ReactNode
}

const TableFoot: FC<Props> = ({ children }) => <tfoot className={classes["root"]}>{children}</tfoot>

export default TableFoot
