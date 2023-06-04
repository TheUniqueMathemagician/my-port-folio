import { RunningApplicationComponent, WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { useUsersStore } from "context/users"
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react"
import { MdInfo } from "react-icons/md"
import Avatar from "../ui/Avatar"
import Container from "../ui/Container"
import Paper from "../ui/Paper"
import Tab from "../ui/Tab"
import TabPanel from "../ui/TabPanel"
import Tabs from "../ui/Tabs"
import Typography from "../ui/Typography"
import Button from "../ui/input/Button"
import Radio from "../ui/input/Radio"
import RadioGroup from "../ui/input/RadioGroup"
import classes from "./Settings.module.scss"

const enum PanelIndex {
	Theme,
	Language,
	Users,
}

const Settings: RunningApplicationComponent = (props) => {
	const { args, pid } = props

	const [panelIndex, setPanelIndex] = useState(args["tab"] === "profile" ? PanelIndex.Users : PanelIndex.Theme)

	// #region Selectors

	const users = useUsersStore((store) => store.elements)
	const background = useThemeStore((store) => store.palette.background[store.colorScheme])
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const colorScheme = useThemeStore((store) => store.colorScheme)
	const currentUserID = useUsersStore((store) => store.currentUserID)
	const palette = useThemeStore((store) => store.palette)
	const primary = useThemeStore((store) => store.palette.primary[store.colorScheme])
	const resizing = useApplicationsStore((store) => Boolean(store.instances[pid]))
	const small = useApplicationsStore((store) => {
		const instance = store.instances[pid] as WindowInstance

		if (instance.breakpoint === Breakpoints.sm) return true
		if (instance.breakpoint === Breakpoints.xs) return true

		return false
	})
	const setBackgroundColor = useThemeStore((store) => store.setBackgroundColor)
	const setPrimaryColor = useThemeStore((store) => store.setPrimaryColor)
	const setColorScheme = useThemeStore((store) => store.setColorScheme)

	// #endregion

	const handleTabChange = useCallback((value: PanelIndex) => {
		setPanelIndex(value)
	}, [])

	useEffect(() => {
		const root = document.getElementById("root")

		Object.keys(palette).forEach((key) => {
			const value = palette as any[typeof key] as any[typeof colorScheme]

			root?.style.setProperty(`--cvos-${key}`, value)
			root?.style.setProperty(`--cvos-${key}-20`, `${value}14`)
			root?.style.setProperty(`--cvos-${key}-33`, `${value}55`)
			root?.style.setProperty(`--cvos-${key}-50`, `${value}80`)
			root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`)
		})
	}, [palette, colorScheme])

	const handleBackgroundInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setBackgroundColor({
			[ColorScheme.contrast]: e.target.value,
			[ColorScheme.dark]: e.target.value,
			[ColorScheme.default]: e.target.value,
			[ColorScheme.light]: e.target.value,
		})
	}, [setBackgroundColor])

	const handleResetBackground = useCallback(() => {
		setBackgroundColor({
			[ColorScheme.contrast]: "#000000",
			[ColorScheme.dark]: "#333333",
			[ColorScheme.default]: "#cccccc",
			[ColorScheme.light]: "#ffffff",
		})
	}, [setBackgroundColor])

	const handlePrimaryInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setPrimaryColor({
			[ColorScheme.contrast]: e.target.value,
			[ColorScheme.dark]: e.target.value,
			[ColorScheme.default]: e.target.value,
			[ColorScheme.light]: e.target.value,
		})
	}, [setPrimaryColor])

	const handleResetPrimary = useCallback(() => {
		setPrimaryColor({
			[ColorScheme.contrast]: "#ffff00",
			[ColorScheme.dark]: "#4489f8",
			[ColorScheme.default]: "#0075db",
			[ColorScheme.light]: "#0088ff",
		})
	}, [setPrimaryColor])

	const otherUsersKeys = Object.keys(users).filter(
		(key) => key !== users[currentUserID]?.id
	)

	const classNameBuilder = ClassName.builder(classes["root"])

	if (small) classNameBuilder.add(classes["small"])

	return <div className={classNameBuilder.build()}>
		<Tabs
			defaultValue={panelIndex}
			direction={small ? "bottom" : "right"}
			onChange={handleTabChange}
			separator={colorScheme === ColorScheme.contrast}
			shouldRefresh={resizing}
		>
			<Tab label="Theme" value={PanelIndex.Theme} active={panelIndex === PanelIndex.Theme} />
			<Tab label="Langue" value={PanelIndex.Language} active={panelIndex === PanelIndex.Language} />
			<Tab label="Utilisateurs" value={PanelIndex.Users} active={panelIndex === PanelIndex.Users} />
		</Tabs>
		<TabPanel value={panelIndex} index={PanelIndex.Theme} spaced>
			<Typography variant="h3" noWrap noSelect>
				Préférences du thème
			</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Thème de l&apos;interface
				</Typography>
				<RadioGroup>
					<Radio
						name={`${pid}_theme`}
						label="Défaut"
						value={ColorScheme.default}
						noSelect
						checked={colorScheme === ColorScheme.default}
						onChange={() => setColorScheme(ColorScheme.default)}
					></Radio>
					<Radio
						name={`${pid}_theme`}
						label="Clair"
						value={ColorScheme.light}
						noSelect
						checked={colorScheme === ColorScheme.light}
						onChange={() => setColorScheme(ColorScheme.light)}
					></Radio>
					<Radio
						name={`${pid}_theme`}
						label="Sombre"
						value={ColorScheme.dark}
						noSelect
						checked={colorScheme === ColorScheme.dark}
						onChange={() => setColorScheme(ColorScheme.dark)}
					></Radio>
					<Radio
						name={`${pid}_theme`}
						label="Contrasté"
						value={ColorScheme.contrast}
						noSelect
						checked={colorScheme === ColorScheme.contrast}
						onChange={() => setColorScheme(ColorScheme.contrast)}
					></Radio>
				</RadioGroup>
				<br />
				<div className={classes["flex"]}>
					<Typography variant="body" noSelect color="info">
						<MdInfo></MdInfo>
					</Typography>
					<Typography variant="body" noSelect>
						Le thème contrasté améliore les performances de rendu
					</Typography>
				</div>
			</Paper>
			<br />
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Couleur de l&apos;interface
				</Typography>
				<div className={classes["flex"]}>
					<input
						type="color"
						name={`${pid}_background`}
						value={background}
						onChange={handleBackgroundInputChange}
					></input>
					<Button
						color="primary"
						contrast={colorScheme === ColorScheme.contrast}
						focusable
						ripple
						size="md"
						variant="filled"
						onClick={handleResetBackground}
					>
						Par défaut
					</Button>
				</div>
			</Paper>
			<br />
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Couleur des éléments interactifs
				</Typography>
				<div className={classes["flex"]}>
					<input
						type="color"
						name={`${pid}_primary`}
						value={primary}
						onChange={handlePrimaryInputChange}
					></input>
					<Button
						color="primary"
						contrast={colorScheme === ColorScheme.contrast}
						focusable
						ripple
						size="md"
						variant="filled"
						onClick={handleResetPrimary}
					>
						Par défaut
					</Button>
				</div>
			</Paper>
		</TabPanel>
		<TabPanel value={panelIndex} index={PanelIndex.Language} spaced>
			<Typography variant="h3" noWrap noSelect>
				Préférences linguistiques
			</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Langue du système
				</Typography>
				<RadioGroup>
					<Radio
						defaultChecked
						label="Français"
						name={`${pid}_language`}
					></Radio>
					<Radio disabled label="English" name={`${pid}_language`}></Radio>
					<Radio disabled label="Deutsch" name={`${pid}_language`}></Radio>
				</RadioGroup>
			</Paper>
		</TabPanel>
		<TabPanel value={panelIndex} index={PanelIndex.Users} spaced>
			<Typography variant="h3" noWrap noSelect>
				Préférences utilisateurs
			</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Utilisateur actuel
				</Typography>
				<Container type="grid" orientation="row" space>
					<Avatar
						alt="Image de profil"
						src={users[currentUserID].profileImageURL}
					></Avatar>
					<Typography variant="body" noWrap noSelect>
						{users[currentUserID].displayName}
					</Typography>
				</Container>
				<Typography variant="h4" noWrap noSelect>
					Autres utilisateurs
				</Typography>
				{otherUsersKeys.length > 0
					? otherUsersKeys.map((key) => <div key={key}>
						<Avatar
							alt="Image de profil"
							src={users[key].profileImageURL}
						></Avatar>
						<Typography variant="body" noWrap noSelect>
							{users[key].displayName}
						</Typography>
					</div>)
					: <Typography variant="body" noSelect>
						Aucun autre utilisateur
					</Typography>
				}
			</Paper>
		</TabPanel>
	</div>
}

export default memo(Settings)
