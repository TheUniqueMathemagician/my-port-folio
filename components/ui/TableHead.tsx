import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./TableHead.module.scss"

type Props = PropsWithChildren

const TableHead: FunctionComponent<Props> = ({ children }) => <thead className={classes["root"]}>{children}</thead>

export default TableHead
