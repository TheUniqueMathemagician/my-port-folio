import { WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { FC, memo, PropsWithChildren, useCallback, useEffect, useState } from "react"
import { MdInfo } from "react-icons/md"
import { useDispatch, useSelector } from "../../hooks/Store"
import { setBackgroundColor, setColorScheme, setPrimaryColor } from "../../store/slices/Theme"
import Avatar from "../ui/Avatar"
import Container from "../ui/Container"
import Button from "../ui/input/Button"
import Radio from "../ui/input/Radio"
import RadioGroup from "../ui/input/RadioGroup"
import Paper from "../ui/Paper"
import Tab from "../ui/Tab"
import TabPanel from "../ui/TabPanel"
import Tabs from "../ui/Tabs"
import Typography from "../ui/Typography"
import classes from "./Settings.module.scss"

type Props = {
	pid: string
	args: { [key: string]: string }
}

const Settings: FC<Props> = (props) => {
	const { args, pid } = props

	const [panelIndex, setPanelIndex] = useState(args["tab"] === "profile" ? 2 : 0)

	const dispatch = useDispatch()

	// #region Selectors

	const users = useSelector((store) => store.users.elements)
	const background = useSelector((store) => store.theme.palette.background[store.theme.colorScheme])
	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const colorScheme = useSelector((store) => store.theme.colorScheme)
	const currentUserID = useSelector((store) => store.users.currentUserID)
	const palette = useSelector((store) => store.theme.palette)
	const primary = useSelector((store) => store.theme.palette.primary[store.theme.colorScheme])
	const resizing = useSelector((store) => store.applications.instances[pid] as WindowInstance).resizing
	const small = useSelector((store) => {
		const instance = store.applications.instances[pid] as WindowInstance
		if (instance.breakpoint === Breakpoints.sm) return true
		if (instance.breakpoint === Breakpoints.xs) return true

		return false
	})

	// #endregion

	const handleTabChange = useCallback((value: number) => {
		setPanelIndex(value)
	}, [])

	useEffect(() => {
		const root = document.getElementById("root")

		Object.keys(palette).forEach((key) => {
			const value = ((palette as any)[key] as any)[colorScheme]
			root?.style.setProperty(`--cvos-${key}`, value)
			root?.style.setProperty(`--cvos-${key}-20`, `${value}14`)
			root?.style.setProperty(`--cvos-${key}-33`, `${value}55`)
			root?.style.setProperty(`--cvos-${key}-50`, `${value}80`)
			root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`)
		})
	}, [palette, colorScheme])

	const handleBackgroundInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setBackgroundColor({
			[ColorScheme.contrast]: e.target.value,
			[ColorScheme.dark]: e.target.value,
			[ColorScheme.default]: e.target.value,
			[ColorScheme.light]: e.target.value,
		}))
	}, [dispatch])

	const handleResetBackground = useCallback(() => {
		dispatch(setBackgroundColor({
			[ColorScheme.contrast]: "#000000",
			[ColorScheme.dark]: "#333333",
			[ColorScheme.default]: "#cccccc",
			[ColorScheme.light]: "#ffffff",
		}))
	}, [dispatch])

	const handlePrimaryInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setPrimaryColor({
			[ColorScheme.contrast]: e.target.value,
			[ColorScheme.dark]: e.target.value,
			[ColorScheme.default]: e.target.value,
			[ColorScheme.light]: e.target.value,
		}))
	}, [dispatch])

	const handleResetPrimary = useCallback(() => {
		dispatch(setPrimaryColor({
			[ColorScheme.contrast]: "#ffff00",
			[ColorScheme.dark]: "#4489f8",
			[ColorScheme.default]: "#0075db",
			[ColorScheme.light]: "#0088ff",
		}))
	}, [dispatch])

	const otherUsersKeys = Object.keys(users).filter(
		(key) => key !== users[currentUserID]?.id
	)

	const rootClasses = [classes["root"]]

	if (small) rootClasses.push(classes["small"])

	return <div className={rootClasses.join(" ")}>
		<Tabs
			defaultValue={panelIndex}
			direction={small ? "bottom" : "right"}
			shouldRefresh={resizing}
			onChange={handleTabChange}
			separator={colorScheme === ColorScheme.contrast}
		>
			<Tab label="Theme" value={0} active={panelIndex === 0} />
			<Tab label="Langue" value={1} active={panelIndex === 1} />
			<Tab label="Utilisateurs" value={2} active={panelIndex === 2} />
		</Tabs>
		<TabPanel value={panelIndex} index={0} spaced>
			<Typography variant="h3" noWrap noSelect>
				Préférences du thème
			</Typography>
			<Paper outlined={contrast} fullWidth spaced blur background="paper">
				<Typography variant="h4" noWrap noSelect>
					Thème de l&apos;interface
				</Typography>
				<RadioGroup>
					<Radio
						name={pid + "_theme"}
						label="Défaut"
						value={ColorScheme.default}
						noSelect
						checked={colorScheme === ColorScheme.default}
						onChange={() => dispatch(setColorScheme(ColorScheme.default))}
					></Radio>
					<Radio
						name={pid + "_theme"}
						label="Clair"
						value={ColorScheme.light}
						noSelect
						checked={colorScheme === ColorScheme.light}
						onChange={() => dispatch(setColorScheme(ColorScheme.light))}
					></Radio>
					<Radio
						name={pid + "_theme"}
						label="Sombre"
						value={ColorScheme.dark}
						noSelect
						checked={colorScheme === ColorScheme.dark}
						onChange={() => dispatch(setColorScheme(ColorScheme.dark))}
					></Radio>
					<Radio
						name={pid + "_theme"}
						label="Contrasté"
						value={ColorScheme.contrast}
						noSelect
						checked={colorScheme === ColorScheme.contrast}
						onChange={() => dispatch(setColorScheme(ColorScheme.contrast))}
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
						name={pid + "_background"}
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
						name={pid + "_primary"}
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
		<TabPanel value={panelIndex} index={1} spaced>
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
						name={pid + "_language"}
					></Radio>
					<Radio disabled label="English" name={pid + "_language"}></Radio>
					<Radio disabled label="Deutsch" name={pid + "_language"}></Radio>
				</RadioGroup>
			</Paper>
		</TabPanel>
		<TabPanel value={panelIndex} index={2} spaced>
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
				{otherUsersKeys.length > 0 ? (
					otherUsersKeys.map((key) => (
						<div key={key}>
							<Avatar
								alt="Image de profil"
								src={users[key].profileImageURL}
							></Avatar>
							<Typography variant="body" noWrap noSelect>
								{users[key].displayName}
							</Typography>
						</div>
					))
				) : (
					<Typography variant="body" noSelect>
						Aucun autre utilisateur
					</Typography>
				)}
			</Paper>
		</TabPanel>
	</div>
}

export default memo<PropsWithChildren<Props>>(Settings)
