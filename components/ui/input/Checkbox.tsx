import { Size } from "@/types/Size"
import { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, MouseEventHandler, memo } from "react"
import Mark from "../../icons/Mark"
import classes from "./Checkbox.module.scss"

type Props = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "onClick" | "size" | "type"> & {
	readonly color?: "primary" | "secondary" | "info" | "success" | "warning" | "error"
	readonly onClick?: MouseEventHandler<HTMLLabelElement>
	readonly size?: Size
}

const Checkbox: FunctionComponent<Props> = (props) => {
	const { className, color, onClick, size, ...other } = props

	const rootClasses = [classes["root"]]

	if (size) rootClasses.push(classes[size])
	if (color) rootClasses.push(classes[color])
	if (className) rootClasses.push(className)

	return <label className={rootClasses.join(" ")} onClick={onClick}>
		<input type="checkbox" {...other}></input>
		<div className={classes["checkbox"]}>
			<div className={classes["effect"]}></div>
			<Mark></Mark>
		</div>
	</label>
}

export default memo(Checkbox)
