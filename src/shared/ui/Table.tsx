import { FC, memo, ReactNode } from "react"
import { TSize } from "../../types/TSize"
import classes from "./Table.module.scss"

type Props = {
	children: ReactNode
	fullWidth?: boolean
	outlined?: boolean
	size?: TSize

}

const Table: FC<Props> = (props) => {
	const { children, outlined, fullWidth } = props

	const rootClasses = [classes["root"]]

	if (fullWidth) rootClasses.push(classes["full-width"])
	if (outlined) rootClasses.push(classes["outlined"])

	return <table className={rootClasses.join(" ")}>{children}</table>
}

export default memo<Props>(Table)
