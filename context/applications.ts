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
import { ApplicationId, Arguments, DaemonApplication, DaemonInstance, RunningApplicationComponent, WindowApplication, WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { Dimensions } from "@/types/Dimensions"
import { DomPosition } from "@/types/DomPosition"
import { Position } from "@/types/Position"
import { Resize } from "@/types/Resize"
import { Snap } from "@/types/Snap"
import generateID from "@/utils/generateID"
import { create } from "zustand"

type ApplicationsStore = {
	dragging: boolean
	instances: Record<string, DaemonInstance | WindowInstance>
	pool: Record<ApplicationId, DaemonApplication | WindowApplication>
	resizing: boolean
	snapShadow: { position: DomPosition, visible: boolean }
	zIndexes: string[]
	closeApplication: (pid: string) => void
	runApplication: (aid: ApplicationId, args: Arguments) => void
	sendToFront: (pid: string) => void
	setBreakpoint: (pid: string, breakpoint: Breakpoints) => void
	setDimensions: (pid: string, dimensions: Dimensions) => void
	setDragging: (pid: string, dragging: boolean) => void
	setMaximized: (pid: string, maximized: Snap) => void
	setMinimized: (pid: string, minimized: boolean) => void
	setPosition: (pid: string, position: Position) => void
	setResizeMode: (pid: string, resizeMode: Resize) => void
	setResizing: (pid: string, resizing: boolean) => void
	setRunOnStartup: (aid: ApplicationId, runOnStartup: boolean) => void
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

export const applicationsMap = new Map<ApplicationId, RunningApplicationComponent>([
	[ApplicationId.About, About],
	[ApplicationId.Contact, Contact],
	[ApplicationId.Image, Image],
	[ApplicationId.Manager, Manager],
	[ApplicationId.Maps, Maps],
	[ApplicationId.NightWatcher, NightWatcher],
	[ApplicationId.Randit, Randit],
	[ApplicationId.Projects, Projects],
	[ApplicationId.Settings, Settings],
	[ApplicationId.Snake, Snake],
	[ApplicationId.Welcome, Welcome],
])
const aboutApplication: WindowApplication = {
	applicationId: ApplicationId.About,
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
}

const contactApplication: WindowApplication = {
	applicationId: ApplicationId.Contact,
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
}

const imageApplication: WindowApplication = {
	applicationId: ApplicationId.Image,
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
}

const managerApplication: WindowApplication = {
	applicationId: ApplicationId.Manager,
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
}

const mapsApplication: WindowApplication = {
	applicationId: ApplicationId.Maps,
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
}

const nightWatcherApplication: DaemonApplication = {
	applicationId: ApplicationId.NightWatcher,
	displayName: "NightWatcher",
	icon: "/images/applications/nightwatcher.svg",
	runOnStartup: true,
	shortcut: "",
	type: "daemon",
}

const projectsApplication: WindowApplication = {
	applicationId: ApplicationId.Projects,
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
}

const randitApplication: WindowApplication = {
	applicationId: ApplicationId.Randit,
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
}

const settingsApplication: WindowApplication = {
	applicationId: ApplicationId.Settings,
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
}

const snakeApplication: WindowApplication = {
	applicationId: ApplicationId.Snake,
	dimensions: { height: 600, width: 600 },
	displayName: "le Serpent",
	icon: "/images/applications/snake.svg",
	maxDimensions: defaultMaxDimensions,
	minDimensions: defaultMinDimensions,
	position: { bottom: null, left: null, right: null, top: null },
	resizable: true,
	runOnStartup: false,
	shortcut: "",
	// Shortcut: "/images/applications/snake.svg",
	type: "window",
}

const welcomeApplication: WindowApplication = {
	applicationId: ApplicationId.Welcome,
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
}

export const useApplicationsStore = create<ApplicationsStore>((set, get) => ({
	dragging: false,
	instances: {},
	pool: {
		[ApplicationId.About]: aboutApplication,
		[ApplicationId.Contact]: contactApplication,
		[ApplicationId.Image]: imageApplication,
		[ApplicationId.Manager]: managerApplication,
		[ApplicationId.Maps]: mapsApplication,
		[ApplicationId.NightWatcher]: nightWatcherApplication,
		[ApplicationId.Projects]: projectsApplication,
		[ApplicationId.Randit]: randitApplication,
		[ApplicationId.Settings]: settingsApplication,
		[ApplicationId.Snake]: snakeApplication,
		[ApplicationId.Welcome]: welcomeApplication,
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
				applicationId: application.applicationId,
				displayName: application.displayName,
				icon: application.icon,
				pid,
				type: application.type,
			}
		} else {
			state.instances[pid] = {
				args,
				breakpoint: Breakpoints.xs,
				applicationId: application.applicationId,
				dimensions: application.dimensions,
				displayName: application.displayName,
				dragging: false,
				icon: application.icon,
				maxDimensions: application.maxDimensions,
				maximized: Snap.None,
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

		if (instance.type === "daemon") return

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

		set(() => ({}))
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

// Export const useApplicationsStore = create(devtools(store))
