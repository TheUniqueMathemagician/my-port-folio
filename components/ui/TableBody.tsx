import { FunctionComponent, ReactNode } from "react"

type Props = {
	children: ReactNode
}

const TableBody: FunctionComponent<Props> = ({ children }) => <tbody>{children}</tbody>

export default TableBody
