import { FC, ReactNode } from "react"
import classes from "./TableHead.module.scss"

type Props = {
	children: ReactNode
}

const TableHead: FC<Props> = ({ children }) => <thead className={classes["root"]}>{children}</thead>

export default TableHead
