import { Size } from "@/types/Size"
import { FunctionComponent, ReactNode, memo } from "react"
import classes from "./Table.module.scss"

type Props = {
	children: ReactNode
	fullWidth?: boolean
	outlined?: boolean
	size?: Size
}

const Table: FunctionComponent<Props> = (props) => {
	const { children, outlined, fullWidth } = props

	const rootClasses = [classes["root"]]

	if (fullWidth) rootClasses.push(classes["full-width"])
	if (outlined) rootClasses.push(classes["outlined"])

	return <table className={rootClasses.join(" ")}>{children}</table>
}

export default memo<Props>(Table)
