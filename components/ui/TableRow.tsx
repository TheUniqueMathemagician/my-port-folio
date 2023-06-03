import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableRow.module.scss"

type Props = PropsWithChildren

const TableRow: FunctionComponent<Props> = ({ children }) => <tr className={classes["root"]}>{children}</tr>

export default TableRow
