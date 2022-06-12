import { WindowInstance } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { createElement, FC } from "react"
import { applicationsMap } from "store/slices/Applications"
import { useSelector } from "../../hooks/Store"
import classes from "./Activity.module.scss"
import MenuBar from "./MenuBar"

type Props = {
	pid: string
}

const Activity: FC<Props> = (props) => {
	const { pid } = props

	const zIndexes = useSelector((store) => store.applications.zIndexes)
	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const component = useSelector((store) => (store.applications.instances[pid] as WindowInstance).component)
	const args = useSelector((store) => (store.applications.instances[pid] as WindowInstance).args)

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
