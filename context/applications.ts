import About from "@/components/apps/About"
import Contact from "@/components/apps/Contact"
import Image from "@/components/apps/Image"
import Manager from "@/components/apps/Manager"
import Maps from "@/components/apps/Maps"
import NightWatcher from "@/components/apps/NightWatcher"
import Projects from "@/components/apps/Projects"
import Randit from "@/components/apps/Randit"
import Settings from "@/components/apps/Settings"
import Snake from "@/components/apps/Snake"
import Welcome from "@/components/apps/Welcome"
import { Applications, DaemonApplication, DaemonInstance, WindowApplication, WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { Dimensions } from "@/types/Dimensions"
import { DomPosition } from "@/types/DomPosition"
import { Position } from "@/types/Position"
import { Resize } from "@/types/Resize"
import { Snap } from "@/types/Snap"
import { FC } from "react"
import create from "zustand"
import generateID from "../functions/generateID"

type RunApp = {
	args: any
	pid: string
}

type ApplicationsStore = {
	dragging: boolean
	instances: { [pid: string]: DaemonInstance | WindowInstance }
	pool: { [aid in Applications]: DaemonApplication | WindowApplication }
	resizing: boolean
	snapShadow: { position: DomPosition, visible: boolean }
	zIndexes: string[]
	closeApplication: (pid: string) => void
	runApplication: (aid: Applications, args: { [key: string]: string }) => void
	sendToFront: (pid: string) => void
	setBreakpoint: (pid: string, breakpoint: Breakpoints) => void
	setDimensions: (pid: string, dimensions: Dimensions) => void
	setDragging: (pid: string, dragging: boolean) => void
	setMaximized: (pid: string, maximized: Snap) => void
	setMinimized: (pid: string, minimized: boolean) => void
	setPosition: (pid: string, position: Position) => void
	setResizeMode: (pid: string, resizeMode: Resize) => void
	setResizing: (pid: string, resizing: boolean) => void
	setRunOnStartup: (aid: Applications, runOnStartup: boolean) => void
	setSnapShadowPosition: (domPosition: DomPosition) => void
	setSnapShadowVisibility: (visible: boolean) => void
}

export const defaultDimensions = {
	height: 600,
	width: 800,
}

export const defaultMaxDimensions = {
	height: 900,
	width: 1600,
}

export const defaultMinDimensions = {
	height: 300,
	width: 400,
}

export const applicationsMap = new Map<Applications, FC<RunApp>>([
	[Applications.About, About],
	[Applications.Contact, Contact],
	[Applications.Image, Image],
	[Applications.Manager, Manager],
	[Applications.Maps, Maps],
	[Applications.NightWatcher, NightWatcher],
	[Applications.Randit, Randit],
	[Applications.Projects, Projects],
	[Applications.Settings, Settings],
	[Applications.Snake, Snake],
	[Applications.Welcome, Welcome],
])

export const useApplicationsStore = create<ApplicationsStore>((set, get) => ({
	dragging: false,
	instances: {},
	pool: {
		[Applications.About]: {
			aid: Applications.About,
			dimensions: defaultDimensions,
			displayName: "A Propos",
			icon: "/images/applications/about.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "/images/applications/about.svg",
			type: "window",
		},
		[Applications.Contact]: {
			aid: Applications.Contact,
			dimensions: { height: 600, width: 600 },
			displayName: "Contact",
			icon: "/images/applications/contact.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "/images/applications/contact.svg",
			type: "window",
		},
		[Applications.Image]: {
			aid: Applications.Image,
			dimensions: defaultDimensions,
			displayName: "Image",
			icon: "/images/applications/image.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			type: "window",
		},
		[Applications.Manager]: {
			aid: Applications.Manager,
			dimensions: defaultDimensions,
			displayName: "Gestionnaire d'applications",
			icon: "/images/applications/manager.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			type: "window",
		},
		[Applications.Maps]: {
			aid: Applications.Maps,
			dimensions: defaultDimensions,
			displayName: "Maps",
			icon: "/images/applications/maps.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			type: "window",
		},
		[Applications.NightWatcher]: {
			aid: Applications.NightWatcher,
			displayName: "NightWatcher",
			icon: "/images/applications/nightwatcher.svg",
			runOnStartup: true,
			shortcut: "",
			type: "daemon",
		},
		[Applications.Projects]: {
			aid: Applications.Projects,
			dimensions: defaultDimensions,
			displayName: "Projets",
			icon: "/images/applications/projects.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "/images/applications/projects.svg",
			type: "window",
		},
		[Applications.Randit]: {
			aid: Applications.Randit,
			dimensions: defaultDimensions,
			displayName: "Randit",
			icon: "/images/applications/randit.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			type: "window",
		},
		[Applications.Settings]: {
			aid: Applications.Settings,
			dimensions: defaultDimensions,
			displayName: "Préférences du système",
			icon: "/images/applications/settings.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			type: "window",
		},
		[Applications.Snake]: {
			aid: Applications.Snake,
			dimensions: { height: 600, width: 600 },
			displayName: "le Serpent",
			icon: "/images/applications/snake.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: true,
			runOnStartup: false,
			shortcut: "",
			// shortcut: "/images/applications/snake.svg",
			type: "window",
		},
		[Applications.Welcome]: {
			aid: Applications.Welcome,
			dimensions: { height: 400, width: 400 },
			displayName: "Bienvenue",
			icon: "/images/applications/welcome.svg",
			maxDimensions: defaultMaxDimensions,
			minDimensions: defaultMinDimensions,
			position: { bottom: null, left: null, right: null, top: null },
			resizable: false,
			runOnStartup: true,
			shortcut: "",
			type: "window",
		},
	},
	resizing: false,
	snapShadow: {
		position: { bottom: null, left: null, right: null, top: null },
		visible: false,
	},
	zIndexes: [],
	closeApplication: (pid) => {
		const state = get()

		if (!state.instances[pid]) return

		const zIndexes = state.zIndexes.filter((zIndex) => zIndex !== pid)

		delete state.instances[pid]

		const instances = { ...state.instances }

		set(() => ({ instances, zIndexes }))
	},
	runApplication: (aid, args) => {
		const state = get()
		const application = state.pool[aid]

		const pid = generateID()

		if (application.type === "daemon") {
			state.instances[pid] = {
				args,
				component: application.aid,
				displayName: application.displayName,
				icon: application.icon,
				pid,
				type: application.type,
			}
		} else {
			state.instances[pid] = {
				args,
				breakpoint: Breakpoints.xs,
				component: application.aid,
				dimensions: application.dimensions,
				displayName: application.displayName,
				dragging: false,
				icon: application.icon,
				maxDimensions: application.maxDimensions,
				maximized: Snap.none,
				minDimensions: application.minDimensions,
				minimized: false,
				pid,
				position: application.position,
				resizable: application.resizable,
				resizeMode: Resize.none,
				resizing: false,
				type: "window",
			}

			state.zIndexes.push(pid)
		}

		const zIndexes = [...state.zIndexes]

		set(() => ({ zIndexes }))
	},
	sendToFront: (pid) => {
		const state = get()

		const instanceIndex = state.zIndexes.indexOf(pid)

		state.zIndexes.splice(instanceIndex, 1)
		state.zIndexes.push(pid)

		const zIndexes = [...state.zIndexes]

		set(() => ({ zIndexes }))
	},
	setBreakpoint: (pid, breakpoint) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.breakpoint = breakpoint

		set(() => ({}))
	},
	setDimensions: (pid, dimensions) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return state

		instance.dimensions = dimensions

		set(() => ({}))
	},
	setDragging: (pid, dragging) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.dragging = dragging

		state.dragging = dragging

		set(() => ({}))
	},
	setMaximized: (pid, maximized) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.maximized = maximized

		set(() => ({}))
	},
	setMinimized: (pid, minimized) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.minimized = minimized

		set(() => ({}))
	},
	setPosition: (pid, position) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.position = position

		set(() => ({}))
	},
	setResizeMode: (pid, resizeMode) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.resizeMode = resizeMode

		set(() => ({}))
	},
	setResizing: (pid, resizing) => {
		const state = get()

		const instance = state.instances[pid]

		if (instance.type === "daemon") return

		instance.resizing = resizing

		state.resizing = resizing

		set(() => ({}))
	},
	setRunOnStartup: (aid, runOnStartup) => {
		const state = get()

		const application = state.pool[aid]

		application.runOnStartup = runOnStartup

		const pool = { ...state.pool }

		set(() => ({ pool }))
	},
	setSnapShadowPosition: (position) => {
		const state = get()

		state.snapShadow.position = position

		set(() => ({}))
	},
	setSnapShadowVisibility: (visible) => {
		const state = get()

		state.snapShadow.visible = visible

		set(() => ({}))
	},
}))

// export const useApplicationsStore = create(devtools(store))
