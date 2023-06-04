import { FunctionComponent, PropsWithChildren } from "react"

type TableBodyProps = PropsWithChildren

const TableBody: FunctionComponent<TableBodyProps> = ({ children }) => <tbody>{children}</tbody>

export default TableBody
