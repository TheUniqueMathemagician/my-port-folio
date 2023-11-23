import { ClassName } from "@/utils/ClassName"
import { FunctionComponent, PropsWithChildren, createElement } from "react"
import classes from "./Typography.module.scss"

type TypographyProps = PropsWithChildren & {
	bold?: boolean
	className?: string
	color?: "error" | "hint" | "info" | "primary" | "secondary" | "success" | "warning"
	noSelect?: boolean
	noWrap?: boolean
	tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "label" | "li" | "span"
	variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h1" | "body" | "p"
}

const Typography: FunctionComponent<TypographyProps> = (props) => {
	const { bold, children, className, color, noSelect, noWrap, tag, variant } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (bold) classNameBuilder.add(classes["bold"])
	if (className) classNameBuilder.add(className)
	if (color) classNameBuilder.add(classes[color])
	if (noSelect) classNameBuilder.add(classes["no-select"])
	if (noWrap) classNameBuilder.add(classes["no-wrap"])
	if (variant) classNameBuilder.add(classes[variant])

	return createElement(tag ?? "span", { className: classNameBuilder.build() }, children)
}

export default Typography
