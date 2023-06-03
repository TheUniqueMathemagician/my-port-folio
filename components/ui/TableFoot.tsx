import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableFoot.module.scss"

type Props = PropsWithChildren

const TableFoot: FunctionComponent<Props> = ({ children }) => <tfoot className={classes["root"]}>{children}</tfoot>

export default TableFoot
