import { Applications } from "@/types/Application"
import { ColorScheme } from "@/types/ColorScheme"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import { FC, memo, MouseEventHandler, useRef, useState } from "react"
import { IoLogOutOutline } from "react-icons/io5"
import { MdLock, MdMail, MdPhone, MdPowerSettingsNew, MdSend } from "react-icons/md"
import { batch } from "react-redux"
import { setHasRanStartupApplications } from "store/slices/OS"
import { useDispatch, useSelector } from "../../hooks/Store"
import { closeApplication, runApplication, sendToFront, setMinimized } from "../../store/slices/Applications"
import { setCurrentUserID } from "../../store/slices/Users"
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

const TaskBar: FC = () => {
	const [menuShown, setMenuShown] = useState(EMenuShown.None)

	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const instances = useSelector((store) => store.applications.instances, (left, right) => {
		for (const key in left) {
			const leftItem = left[key]
			const rightItem = right[key]

			if (leftItem?.displayName !== rightItem?.displayName) return false
		}

		if (Object.keys(left)?.length !== Object.keys(right)?.length) return false

		return true
	})
	const applications = useSelector((store) => store.applications.pool, (left, right) => {
		for (const key in left) {
			const applicationKey = +key as Applications

			const leftItem = left[applicationKey]
			const rightItem = right[applicationKey]

			if (leftItem?.displayName !== rightItem?.displayName) return false
		}

		if (Object.keys(left)?.length !== Object.keys(right)?.length) return false

		return true
	})

	const contactButtonRef = useRef<HTMLButtonElement>(null)
	const langButtonRef = useRef<HTMLButtonElement>(null)
	const taskBarRef = useRef<HTMLDivElement>(null)

	const router = useRouter()
	const dispatch = useDispatch()

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
		batch(() => {
			for (const pid of Object.keys(instances)) dispatch(closeApplication({ pid }))
			dispatch(setHasRanStartupApplications(false))
			dispatch(setCurrentUserID(""))
		})

		router.push("/lock")
	}

	const handleShutdownMenuClick = () => {
		batch(() => {
			for (const pid of Object.keys(instances)) dispatch(closeApplication({ pid }))
			dispatch(setHasRanStartupApplications(false))
			dispatch(setCurrentUserID(""))
		})
		// TODO: find a better solution !, this is a hack
		setTimeout(() => router.replace("/"), 0)
	}

	const handleMenuApplicationClick = (aid: number) => {
		dispatch(runApplication({ aid, args: {} }))
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
									batch(() => {
										dispatch(setMinimized({ pid: instance.pid, minimized: false }))
										dispatch(sendToFront({ pid: instance.pid }))
									})
								}
							}}
						>
							<img src={instance.icon} alt={instance.displayName} />
						</Button>
					</li>
					)}
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
							dispatch(runApplication({ aid: Applications.Settings, args: { tab: "profile" } }))
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
							dispatch(runApplication({ aid: Applications.Settings, args: {} }))
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
							dispatch(runApplication({ aid: Applications.Manager, args: {} }))
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
