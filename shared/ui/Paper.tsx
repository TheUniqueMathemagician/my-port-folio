import { useSelector } from "@/hooks/Store"
import { Color } from "@/types/Color"
import { ColorScheme } from "@/types/ColorScheme"
import { createElement, DetailedHTMLProps, FC, HTMLAttributes, memo } from "react"
import classes from "./Paper.module.scss"

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	background?: Color
	blur?: boolean
	fullWidth?: boolean
	outlined?: boolean
	spaced?: boolean
	tag?: "header" | "footer" | "main" | "article" | "section" | "div"
}

const Paper: FC<Props> = (props) => {
	const { background, blur, children, className, fullWidth, outlined, spaced, tag, ...other } = props

	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)

	const rootClasses = [classes["root"]]

	if (outlined) rootClasses.push(classes["outlined"])
	if (fullWidth) rootClasses.push(classes["full-width"])
	if (spaced) rootClasses.push(classes["padding"])
	if (contrast) rootClasses.push(classes["contrast"])
	if (className) rootClasses.push(className)
	if (background) rootClasses.push(classes[background])
	if (blur) rootClasses.push(classes["blur"])

	return createElement(tag ?? "div", { className: rootClasses.join(" "), ...other }, children)
}

export default memo<Props>(Paper)
