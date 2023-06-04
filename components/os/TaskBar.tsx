import { ApplicationId } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { useOsStore } from "context/os"
import { useThemeStore } from "context/theme"
import { useUsersStore } from "context/users"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { FunctionComponent, MouseEventHandler, memo, useRef, useState } from "react"
import { IoLogOutOutline } from "react-icons/io5"
import { MdLock, MdMail, MdPhone, MdPowerSettingsNew, MdSend } from "react-icons/md"
import Menu from "../icons/Menu"
import Divider from "../ui/Divider"
import Button from "../ui/input/Button"
import classes from "./TaskBar.module.scss"
import TaskBarMenu from "./TaskBarMenu"
import TaskBarTimeDate from "./TaskBarTimeDate"

const enum MenuTab {
	Contact,
	Language,
	Main,
	None,
}

const Send = memo(MdSend)

const TaskBar: FunctionComponent = () => {
	const [menuShown, setMenuShown] = useState(MenuTab.None)

	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const instances = useApplicationsStore((store) => store.instances)
	const applications = useApplicationsStore((store) => store.pool)

	const runApplication = useApplicationsStore((store) => store.runApplication)
	const sendToFront = useApplicationsStore((store) => store.sendToFront)
	const setMinimized = useApplicationsStore((store) => store.setMinimized)
	const closeApplication = useApplicationsStore((store) => store.closeApplication)
	const setHasRanStartupApplications = useOsStore((store) => store.setHasRanStartupApplications)
	const setCurrentUserID = useUsersStore((store) => store.setCurrentUserID)

	const contactButtonRef = useRef<HTMLButtonElement>(null)
	const langButtonRef = useRef<HTMLButtonElement>(null)
	const taskBarRef = useRef<HTMLDivElement>(null)

	const router = useRouter()

	const classNameBuilder = ClassName.builder(classes["root"])

	const closeMenu = () => setMenuShown(MenuTab.None)

	const handleMainMenuClick: MouseEventHandler<HTMLAnchorElement> & MouseEventHandler<HTMLButtonElement> = (e) => {
		if (menuShown === MenuTab.Main) closeMenu()
		else setMenuShown(MenuTab.Main)
	}

	const handleContactMenuClick = () => {
		if (menuShown === MenuTab.Contact) closeMenu()
		else setMenuShown(MenuTab.Contact)
	}

	const handleLanguageMenuClick = () => {
		if (menuShown === MenuTab.Language) closeMenu()
		else setMenuShown(MenuTab.Language)
	}

	const handleLockMenuClick = () => {
		router.push("/lock")
	}

	const handleDisconnectMenuClick = () => {
		for (const pid of Object.keys(instances)) closeApplication(pid)
		setHasRanStartupApplications(false)
		setCurrentUserID("")
		router.push("/lock")
	}

	const handleShutdownMenuClick = () => {
		for (const pid of Object.keys(instances)) closeApplication(pid)
		setHasRanStartupApplications(false)
		setCurrentUserID("")
		// TODO: find a better solution !, this is a hack
		setTimeout(() => router.replace("/"), 0)
	}

	const handleMenuApplicationClick = (aid: number) => {
		runApplication(aid, {})
		closeMenu()
	}

	if (contrast) classNameBuilder.add(classes["contrast"])

	return <>
		<div className={classNameBuilder.build()} ref={taskBarRef}>
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
				{Object.keys(instances)
					.map((x) => instances[x])
					.filter((app) => app.type === "window")
					.map((instance) => <li key={instance.pid}>
						<Button
							size="md"
							ripple
							focusable
							onClick={() => {
								if (instance.type === "window") {
									setMinimized(instance.pid, false)
									sendToFront(instance.pid)
								}
							}}
						>
							<Image src={instance.icon} alt={instance.displayName} width={32} height={32} />
						</Button>
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
			shown={menuShown === MenuTab.Main}
			position={{
				bottom: taskBarRef.current?.clientHeight ?? 0,
				left: 0,
				right: null,
				top: null,
			}}
		>
			<ul>
				{Object.keys(applications)
					.map((key) => Number(key) as ApplicationId)
					.filter((key) => Boolean(applications[key].shortcut))
					.map((key) => (
						<li key={key}>
							<Button
								ripple
								size="md"
								focusable={menuShown === MenuTab.Main}
								onClick={() => handleMenuApplicationClick(Number(key))}
								startIcon
								align="start"
								fullWidth
							>
								<Image
									alt={applications[key].displayName}
									height={24}
									src={applications[key].icon}
									width={24}
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
						focusable={menuShown === MenuTab.Main}
						onClick={() => {
							runApplication(ApplicationId.Settings, { tab: "profile" })
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
						focusable={menuShown === MenuTab.Main}
						onClick={() => {
							runApplication(ApplicationId.Settings, {})
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
						focusable={menuShown === MenuTab.Main}
						onClick={() => {
							runApplication(ApplicationId.Manager, {})
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
						focusable={menuShown === MenuTab.Main}
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
						focusable={menuShown === MenuTab.Main}
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
						focusable={menuShown === MenuTab.Main}
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
			shown={menuShown === MenuTab.Contact}
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
						focusable={menuShown === MenuTab.Contact}
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
						focusable={menuShown === MenuTab.Contact}
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
			shown={menuShown === MenuTab.Language}
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
