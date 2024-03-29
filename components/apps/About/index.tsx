import { ApplicationId, RunningApplicationComponent, WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { memo, useCallback, useState } from "react"
import { MdSend } from "react-icons/md"
import Tab from "../../ui/Tab"
import TabPanel from "../../ui/TabPanel"
import Tabs from "../../ui/Tabs"
import Button from "../../ui/input/Button"
import Hobbies from "./Elements/Hobbies"
import Intro from "./Elements/Intro"
import Skills from "./Elements/Skills"
import classes from "./index.module.scss"

const enum TabIndex {
	About,
	Hobbies,
	Skills,
}

const Send = memo(MdSend)

const About: RunningApplicationComponent = (props) => {
	const { pid } = props

	const [panelIndex, setPanelIndex] = useState<number>(0)

	const runApplication = useApplicationsStore((store) => store.runApplication)
	const resizing = useApplicationsStore((store) => store.resizing)
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const small = useApplicationsStore((store) => {
		const instance = store.instances[pid] as WindowInstance

		if (instance.breakpoint === Breakpoints.sm) return true
		if (instance.breakpoint === Breakpoints.xs) return true

		return false
	})

	const handleContactClick = useCallback(() => runApplication(ApplicationId.Contact, {}), [runApplication])

	const classNameBuilder = ClassName.builder(classes["root"])
	const leftBarClassNameBuilder = ClassName.builder(classes["left-bar"])

	if (small) classNameBuilder.add(classes["small"])
	if (contrast) leftBarClassNameBuilder.add(classes["contrast"])

	return <div className={classNameBuilder.build()}>
		<div className={leftBarClassNameBuilder.build()}>
			<Tabs
				direction={small ? "top" : "right"}
				defaultValue={0}
				onChange={(v: number) => setPanelIndex(v)}
				shouldRefresh={resizing}
			>
				<Tab
					active={panelIndex === TabIndex.About}
					label="Profil"
					value={TabIndex.About}
				/>
				<Tab
					active={panelIndex === TabIndex.Skills}
					label="Compétences"
					value={TabIndex.Skills}
				/>
				<Tab
					label="Loisirs"
					active={panelIndex === TabIndex.Hobbies}
					value={TabIndex.Hobbies}
				/>
			</Tabs>
			{!small && <Button
				focusable
				fullWidth
				startIcon
				color="primary"
				onClick={handleContactClick}
			>
				<Send></Send>
				<span>Contacter</span>
			</Button>
			}
		</div>
		<TabPanel
			className={classes["tab-panel"]}
			index={TabIndex.About}
			value={panelIndex}
			spaced
		>
			<Intro pid={pid}></Intro>
		</TabPanel>
		<TabPanel
			className={classes["tab-panel"]}
			index={TabIndex.Skills}
			value={panelIndex}
			spaced
		>
			<Skills pid={pid}></Skills>
		</TabPanel>
		<TabPanel
			className={classes["tab-panel"]}
			index={TabIndex.Hobbies}
			value={panelIndex}
			spaced
		>
			<Hobbies pid={pid}></Hobbies>
		</TabPanel>
	</div>
}

export default memo(About)
