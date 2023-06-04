import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableHead.module.scss"

type TableHeadProps = PropsWithChildren

const TableHead: FunctionComponent<TableHeadProps> = ({ children }) => <thead className={classes["root"]}>{children}</thead>

export default TableHead
