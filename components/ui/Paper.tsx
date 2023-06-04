import { Color } from "@/types/Color"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { useThemeStore } from "context/theme"
import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, createElement, memo } from "react"
import classes from "./Paper.module.scss"

type PaperProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	background?: Color
	blur?: boolean
	fullWidth?: boolean
	outlined?: boolean
	spaced?: boolean
	tag?: "header" | "footer" | "main" | "article" | "section" | "div"
}

const Paper: FunctionComponent<PaperProps> = (props) => {
	const { background, blur, children, className, fullWidth, outlined, spaced, tag, ...other } = props

	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)

	const classNameBuilder = ClassName.builder(classes["root"])

	if (outlined) classNameBuilder.add(classes["outlined"])
	if (background) classNameBuilder.add(classes[background])
	if (blur) classNameBuilder.add(classes["blur"])
	if (className) classNameBuilder.add(className)
	if (contrast) classNameBuilder.add(classes["contrast"])
	if (fullWidth) classNameBuilder.add(classes["full-width"])
	if (spaced) classNameBuilder.add(classes["padding"])

	return createElement(tag ?? "div", { className: classNameBuilder.build(), ...other }, children)
}

export default memo(Paper)
