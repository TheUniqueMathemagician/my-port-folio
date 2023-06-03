import { FunctionComponent, ReactNode, createElement, memo } from "react"
import classes from "./Typography.module.scss"

type Props = {
	children: ReactNode
	bold?: boolean
	className?: string
	color?: "error" | "hint" | "info" | "primary" | "secondary" | "success" | "warning"
	noSelect?: boolean
	noWrap?: boolean
	tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "label" | "li" | "span"
	variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h1" | "body" | "p"
}

const Typography: FunctionComponent<Props> = (props) => {
	const { bold, children, className, color, noSelect, noWrap, tag, variant } = props

	const rootClasses = [classes["root"]]

	if (bold) rootClasses.push(classes["bold"])
	if (className) rootClasses.push(className)
	if (color) rootClasses.push(classes[color])
	if (noSelect) rootClasses.push(classes["no-select"])
	if (noWrap) rootClasses.push(classes["no-wrap"])
	if (variant) rootClasses.push(classes[variant])

	let el = "div"

	if (tag) el = tag
	else if (variant) el = variant === "body" ? "div" : variant

	return createElement(el, { className: rootClasses.join(" ") }, children)
}

export default memo<Props>(Typography)
