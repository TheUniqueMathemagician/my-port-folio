import { WindowInstance } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FunctionComponent, createElement } from "react"
import classes from "./Activity.module.scss"
import MenuBar from "./MenuBar"

type ActivityProps = {
	pid: string
}

const Activity: FunctionComponent<ActivityProps> = (props) => {
	const { pid } = props

	const zIndexes = useApplicationsStore((store) => store.zIndexes)
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const component = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).applicationId)
	const args = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).args)

	const classNameBuilder = ClassName.builder(classes["root"])

	if (contrast) classNameBuilder.add(classes["contrast"])

	const zIndex = zIndexes.indexOf(pid)
	const renderComponent = applicationsMap.get(component)

	return <section style={{ zIndex }} className={classNameBuilder.build()}>
		<MenuBar pid={pid}></MenuBar>
		{renderComponent ? createElement(renderComponent, { args, pid }) : null}
	</section>
}

export default Activity
