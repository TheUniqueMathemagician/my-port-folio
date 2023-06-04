import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableRow.module.scss"

type TableRowProps = PropsWithChildren

const TableRow: FunctionComponent<TableRowProps> = ({ children }) => <tr className={classes["root"]}>{children}</tr>

export default TableRow
