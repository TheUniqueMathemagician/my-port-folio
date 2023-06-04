import { ClassName } from "@/utils/ClassName"
import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, createElement, memo } from "react"
import classes from "./TabPanel.module.scss"

type TabPanelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	index: number
	spaced?: boolean
	tag?: "div" | "article"
	value: number
}

const TabPanel: FunctionComponent<TabPanelProps> = (props) => {
	const { children, spaced, value, index, className, tag, ...other } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	if (className) classNameBuilder.add(className)
	if (spaced) classNameBuilder.add(classes["spaced"])

	return createElement(tag ?? "div", {
		className: classNameBuilder.build(),
		hidden: value !== index,
		role: "tabpanel",
		...other,
	}, children)
}

export default memo(TabPanel)
