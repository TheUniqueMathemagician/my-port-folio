import { FC, ReactNode } from "react"
import classes from "./TableRow.module.scss"

type Props = {
	children: ReactNode
}

const TableRow: FC<Props> = ({ children }) => <tr className={classes["root"]}>{children}</tr>

export default TableRow
