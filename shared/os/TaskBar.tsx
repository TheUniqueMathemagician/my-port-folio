import { Applications } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { useApplicationsStore } from "context/applications"
import { useOsStore } from "context/os"
import { useThemeStore } from "context/theme"
import { useUsersStore } from "context/users"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { FC, memo, MouseEventHandler, useRef, useState } from "react"
import { IoLogOutOutline } from "react-icons/io5"
import { MdLock, MdMail, MdPhone, MdPowerSettingsNew, MdSend } from "react-icons/md"
import Menu from "../icons/Menu"
import Divider from "../ui/Divider"
import Button from "../ui/input/Button"
import classes from "./TaskBar.module.scss"
import TaskBarMenu from "./TaskBarMenu"
import TaskBarTimeDate from "./TaskBarTimeDate"

enum EMenuShown {
	Contact,
	Language,
	Main,
	None,
}

const Send = memo(MdSend)

type TaskIconButtonProps = {
	pid: string
}

const TaskIconButton: FC<TaskIconButtonProps> = (props) => {
	const { pid } = props

	const displayName = useApplicationsStore((store) => store.instances[pid].displayName)
	const icon = useApplicationsStore((store) => store.instances[pid].icon)
	const setMinimized = useApplicationsStore((store) => store.setMinimized)
	const sendToFront = useApplicationsStore((store) => store.sendToFront)

	return <Button
		size="md"
		ripple
		focusable
		onClick={() => {
			setMinimized(pid, false)
			sendToFront(pid)
		}}
	>
		<Image src={icon} alt={displayName} layout="fixed" width={24} height={24} objectFit="cover" />
	</Button>
}

const TaskBar: FC = () => {
	const [menuShown, setMenuShown] = useState(EMenuShown.None)

	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const instanceKeys = useApplicationsStore((store) => Object.keys(store.instances), (instanceKeys, nextInstanceKeys) => instanceKeys.length === nextInstanceKeys.length)
	const applications = useApplicationsStore((store) => store.pool)

	const runApplication = useApplicationsStore((store) => store.runApplication)
	const closeApplication = useApplicationsStore((store) => store.closeApplication)
	const setHasRanStartupApplications = useOsStore((store) => store.setHasRanStartupApplications)
	const setCurrentUserID = useUsersStore((store) => store.setCurrentUserID)

	const contactButtonRef = useRef<HTMLButtonElement>(null)
	const langButtonRef = useRef<HTMLButtonElement>(null)
	const taskBarRef = useRef<HTMLDivElement>(null)

	const router = useRouter()

	const rootClasses = [classes["root"]]

	const closeMenu = () => setMenuShown(EMenuShown.None)

	const handleMainMenuClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = (e) => {
		if (menuShown === EMenuShown.Main) closeMenu()
		else setMenuShown(EMenuShown.Main)
	}

	const handleContactMenuClick = () => {
		if (menuShown === EMenuShown.Contact) closeMenu()
		else setMenuShown(EMenuShown.Contact)
	}

	const handleLanguageMenuClick = () => {
		if (menuShown === EMenuShown.Language) closeMenu()
		else setMenuShown(EMenuShown.Language)
	}

	const handleLockMenuClick = () => {
		router.push("/lock")
	}

	const handleDisconnectMenuClick = () => {
		for (const pid of instanceKeys) closeApplication(pid)
		setHasRanStartupApplications(false)
		setCurrentUserID("")
		router.push("/lock")
	}

	const handleShutdownMenuClick = () => {
		for (const pid of instanceKeys) closeApplication(pid)
		setHasRanStartupApplications(false)
		setCurrentUserID("")
		// TODO: find a better solution !, this is a hack
		setTimeout(() => router.replace("/"), 0)
	}

	const handleMenuApplicationClick = (aid: number) => {
		runApplication(aid, {})
		closeMenu()
	}

	if (contrast) rootClasses.push(classes["contrast"])

	return <>
		<div className={rootClasses.join(" ")} ref={taskBarRef}>
			<Button
				size="md"
				focusable
				ripple
				onClick={handleMainMenuClick}
			>
				<Menu></Menu>
			</Button>

			<Divider inset margin vertical></Divider>

			<ul className={classes["apps"]}>
				{instanceKeys.map((instanceKey) => <li key={instanceKey}>
					<TaskIconButton pid={instanceKey} />
				</li>)}
			</ul>

			<Divider inset margin vertical></Divider>

			<Button
				size="md"
				ripple
				focusable
				ref={contactButtonRef}
				onClick={handleContactMenuClick}
			>
				<Send></Send>
			</Button>

			<Divider inset margin vertical></Divider>

			<Button
				size="md"
				ripple
				focusable
				ref={langButtonRef}
				onClick={handleLanguageMenuClick}
			>
				Français
			</Button>

			<Divider inset margin vertical></Divider>

			<Button size="md" readOnly ripple>
				<TaskBarTimeDate></TaskBarTimeDate>
			</Button>
		</div>

		<TaskBarMenu
			shown={menuShown === EMenuShown.Main}
			position={{
				bottom: taskBarRef.current?.clientHeight ?? 0,
				left: 0,
				right: null,
				top: null,
			}}
		>
			<ul>
				{Object.keys(applications)
					.map((key) => +key as Applications)
					.filter((key) => Boolean(applications[key].shortcut))
					.map((key) => (
						<li key={key}>
							<Button
								ripple
								size="md"
								focusable={menuShown === EMenuShown.Main}
								onClick={() => handleMenuApplicationClick(+key)}
								startIcon
								align="start"
								fullWidth
							>
								<Image
									alt={applications[key].displayName}
									src={applications[key].icon}
									layout="fixed"
									width={24}
									height={24}
								></Image>
								<span>{applications[key].displayName} </span>
							</Button>
						</li>
					))}
			</ul>

			<Divider inset margin></Divider>

			<ul>
				<li>
					<Button
						align="start"
						fullWidth
						size="md"
						ripple
						focusable={menuShown === EMenuShown.Main}
						onClick={() => {
							runApplication(Applications.Settings, { tab: "profile" })
							closeMenu()
						}}
					>
						Profil
					</Button>
				</li>
				<li>
					<Button
						align="start"
						fullWidth
						size="md"
						ripple
						focusable={menuShown === EMenuShown.Main}
						onClick={() => {
							runApplication(Applications.Settings, {})
							closeMenu()
						}}
					>
						Paramètres
					</Button>
				</li>
				<li>
					<Button
						align="start"
						fullWidth
						ripple
						size="md"
						focusable={menuShown === EMenuShown.Main}
						onClick={() => {
							runApplication(Applications.Manager, {})
							closeMenu()
						}}
					>
						Applications
					</Button>
				</li>
			</ul>

			<Divider inset margin></Divider>

			<ul>
				<li>
					<Button
						align="start"
						color="success"
						focusable={menuShown === EMenuShown.Main}
						fullWidth
						onClick={handleLockMenuClick}
						ripple
						size="md"
						startIcon
					>
						<MdLock></MdLock>
						<span>Verouiller</span>
					</Button>
				</li>
				<li>
					<Button
						align="start"
						color="warning"
						focusable={menuShown === EMenuShown.Main}
						fullWidth
						onClick={handleDisconnectMenuClick}
						ripple
						size="md"
						startIcon
					>
						<IoLogOutOutline></IoLogOutOutline>
						<span>Se déconnecter</span>
					</Button>
				</li>
				<li>
					<Button
						align="start"
						color="error"
						focusable={menuShown === EMenuShown.Main}
						fullWidth
						onClick={handleShutdownMenuClick}
						ripple
						size="md"
						startIcon
					>
						<MdPowerSettingsNew></MdPowerSettingsNew>
						<span>Éteindre</span>
					</Button>
				</li>
			</ul>
		</TaskBarMenu>

		<TaskBarMenu
			shown={menuShown === EMenuShown.Contact}
			position={{
				bottom: taskBarRef.current?.clientHeight ?? 0,
				left: null,
				right: 0,
				top: null,
			}}
		>
			<ul>
				<li>
					<Button
						align="start"
						size="md"
						focusable={menuShown === EMenuShown.Contact}
						fullWidth
						startIcon
						to="mailto: tamburrini.yannick@gmail.com"
						onClick={closeMenu}
					>
						<MdMail></MdMail>
						<span>tamburrini.yannick@gmail.com</span>
					</Button>
				</li>
				<li>
					<Button
						align="start"
						size="md"
						focusable={menuShown === EMenuShown.Contact}
						fullWidth
						startIcon
						to="tel:+32 498 62 77 16"
						onClick={closeMenu}
					>
						<MdPhone></MdPhone>
						<span>+32 498 62 77 16</span>
					</Button>
				</li>
			</ul>
		</TaskBarMenu>

		<TaskBarMenu
			shown={menuShown === EMenuShown.Language}
			position={{
				bottom: taskBarRef.current?.clientHeight ?? 0,
				left: null,
				right: 0,
				top: null,
			}}
		>
			<ul>
				<li>
					<Button
						align="start"
						fullWidth
						focusable
						size="md"
						ripple
						onClick={closeMenu}
					>
						Français
					</Button>
				</li>
			</ul>
		</TaskBarMenu>
	</>
}

export default TaskBar
