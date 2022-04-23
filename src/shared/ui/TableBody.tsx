import { FC, ReactNode } from "react"

type Props = {
	children: ReactNode
}

const TableBody: FC<Props> = ({ children }) => <tbody>{children}</tbody>

export default TableBody
