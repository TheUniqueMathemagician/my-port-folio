import { Applications, WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FC, memo, useState } from "react"
import { MdCenterFocusStrong, MdDelete } from "react-icons/md"
import Button from "../ui/input/Button"
import ButtonGroup from "../ui/input/ButtonGroup"
import Checkbox from "../ui/input/Checkbox"
import Paper from "../ui/Paper"
import Tab from "../ui/Tab"
import Table from "../ui/Table"
import TableBody from "../ui/TableBody"
import TableCell from "../ui/TableCell"
import TableFoot from "../ui/TableFoot"
import TableHead from "../ui/TableHead"
import TableRow from "../ui/TableRow"
import TabPanel from "../ui/TabPanel"
import Tabs from "../ui/Tabs"
import Typography from "../ui/Typography"
import classes from "./Manager.module.scss"

type Props = {
	pid: string
}

const Manager: FC<Props> = (props) => {
	const { pid } = props

	const applications = useApplicationsStore((store) => store.pool)
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const instances = useApplicationsStore((store) => store.instances)
	const resizing = useApplicationsStore((store) => store.instances[pid] as WindowInstance).resizing
	const small = useApplicationsStore((store) => {
		const instance = store.instances[pid]

		if (instance.type === "daemon") return false

		if (instance.breakpoint === Breakpoints.sm) return true
		if (instance.breakpoint === Breakpoints.xs) return true

		return false
	})

	const setRunOnStartup = useApplicationsStore((store) => store.setRunOnStartup)
	const closeApplication = useApplicationsStore((store) => store.closeApplication)
	const sendToFront = useApplicationsStore((store) => store.sendToFront)
	const setMinimized = useApplicationsStore((store) => store.setMinimized)

	const [panelIndex, setPanelIndex] = useState(0)

	const rootClasses = [classes["root"]]

	if (small) rootClasses.push(classes["small"])

	return <div className={rootClasses.join(" ")}>
		<Tabs
			defaultValue={0}
			direction={small ? "bottom" : "right"}
			onChange={(v: number) => setPanelIndex(v)}
			separator={contrast}
			shouldRefresh={resizing}
		>
			<Tab label="Applications" active={panelIndex === 0} value={0} />
			<Tab label="Instances" active={panelIndex === 1} value={1} />
		</Tabs>
		<TabPanel index={0} value={panelIndex} spaced>
			<Typography variant="h3">Applications</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4">Applications installées</Typography>
				<Table
					aria-label="Applications"
					size="sm"
					outlined={contrast}
					fullWidth={small}
				>
					<TableHead>
						<TableRow>
							<TableCell heading>Nom</TableCell>
							<TableCell heading align="center">
								AID
							</TableCell>
							<TableCell heading align="center">
								Startup
							</TableCell>
							<TableCell heading align="center">
								Fenêtré
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(applications).map((key) => {
							const aid = +key as Applications

							return <TableRow key={key}>
								<TableCell>{applications[aid].displayName}</TableCell>
								<TableCell align="center">{aid}</TableCell>
								<TableCell align="center">
									<form action="#" onSubmit={(e) => e.preventDefault()}>
										<Checkbox
											color="primary"
											checked={applications[aid].runOnStartup}
											onChange={(e) => setRunOnStartup(aid, e.target.checked)}
										></Checkbox>
									</form>
								</TableCell>
								<TableCell align="center">
									<Typography variant="body">
										{applications[aid].type === "window" ? "Oui" : "Non"}
									</Typography>
								</TableCell>
							</TableRow>
						})}
					</TableBody>
					<TableFoot>
						<TableRow>
							<TableCell heading>Nom</TableCell>
							<TableCell heading align="center">
								AID
							</TableCell>
							<TableCell heading align="center">
								Startup
							</TableCell>
							<TableCell heading align="center">
								Fenêtré
							</TableCell>
						</TableRow>
					</TableFoot>
				</Table>
			</Paper>
		</TabPanel>
		<TabPanel index={1} value={panelIndex} spaced>
			<Typography variant="h3">Instances</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4">Instances actives</Typography>
				<Table aria-label="Instances" size="sm" outlined={contrast}>
					<TableHead>
						<TableRow>
							<TableCell heading>Nom</TableCell>
							<TableCell heading align="center">
								PID
							</TableCell>
							<TableCell heading align="center">
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(instances).map((key) => (
							<TableRow key={key}>
								<TableCell>{instances[key].displayName}</TableCell>
								<TableCell align="center">{instances[key].pid}</TableCell>
								<TableCell align="center">
									<ButtonGroup>
										<Button
											isIcon
											ripple
											size="xs"
											onClick={() => closeApplication(key)}
										>
											<MdDelete></MdDelete>
										</Button>
										{instances[key].type === "window" && (
											<Button
												isIcon
												ripple
												size="xs"
												onClick={() => {
													setMinimized(key, false)
													sendToFront(key)
												}}
											>
												<MdCenterFocusStrong color="primary"></MdCenterFocusStrong>
											</Button>
										)}
									</ButtonGroup>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFoot>
						<TableRow>
							<TableCell heading>Nom</TableCell>
							<TableCell heading align="center">
								PID
							</TableCell>
							<TableCell heading align="center">
								Actions
							</TableCell>
						</TableRow>
					</TableFoot>
				</Table>
			</Paper>
		</TabPanel>
	</div>
}

export default memo<Props>(Manager)
