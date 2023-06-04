import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableFoot.module.scss"

type TableFootProps = PropsWithChildren

const TableFoot: FunctionComponent<TableFootProps> = ({ children }) => <tfoot className={classes["root"]}>{children}</tfoot>

export default TableFoot
