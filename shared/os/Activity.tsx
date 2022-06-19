import { WindowInstance } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { createElement, FC } from "react"
import classes from "./Activity.module.scss"
import MenuBar from "./MenuBar"

type Props = {
	pid: string
}

const Activity: FC<Props> = (props) => {
	const { pid } = props

	const zIndexes = useApplicationsStore((store) => store.zIndexes)
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const component = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).component)
	const args = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).args)

	const rootClasses = [classes["root"]]

	const zIndex = zIndexes.indexOf(pid)

	if (contrast) rootClasses.push(classes["contrast"])

	const renderComponent = applicationsMap.get(component)

	return <section style={{ zIndex }} className={rootClasses.join(" ")}  >
		<MenuBar pid={pid}></MenuBar>
		{renderComponent ? createElement(renderComponent, { args, pid }) : null}
	</section>
}

export default Activity
