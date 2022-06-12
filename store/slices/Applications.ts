import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FC } from "react"
import generateID from "../../functions/generateID"
import About from "../../shared/apps/About"
import Contact from "../../shared/apps/Contact"
import Image from "../../shared/apps/Image"
import Manager from "../../shared/apps/Manager"
import Maps from "../../shared/apps/Maps"
import NightWatcher from "../../shared/apps/NightWatcher"
import Projects from "../../shared/apps/Projects"
import Randit from "../../shared/apps/Randit"
import Settings from "../../shared/apps/Settings"
import Snake from "../../shared/apps/Snake"
import Welcome from "../../shared/apps/Welcome"
import { Applications, DaemonApplication, DaemonInstance, WindowApplication, WindowInstance } from "../../types/Application"
import { Breakpoints } from "../../types/Breakpoints"
import { Dimensions } from "../../types/Dimensions"
import { DomPosition } from "../../types/DomPosition"
import { Position } from "../../types/Position"
import { Resize } from "../../types/Resize"
import { Snap } from "../../types/Snap"

type RunApp = {
	args: any
	pid: string
}

type State = {
	pool: { [aid in Applications]: DaemonApplication | WindowApplication }
	instances: { [pid: string]: DaemonInstance | WindowInstance }
	dragging: boolean
	resizing: boolean
	snapShadow: { position: DomPosition, visible: boolean }
	zIndexes: string[]
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

const initialState: State = {
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
	instances: {},
	dragging: false,
	resizing: false,
	snapShadow: {
		position: { bottom: null, left: null, right: null, top: null },
		visible: false,
	},
	zIndexes: [],
}

export const applicationsSlice = createSlice({
	name: "applications",
	initialState,
	reducers: {
		setRunOnStartup(state: State, action: PayloadAction<{ aid: Applications, runOnStartup: boolean }>) {
			const application = state.pool[action.payload.aid]

			application.runOnStartup = action.payload.runOnStartup
		},
		closeApplication(state: State, action: PayloadAction<{ pid: string }>) {
			if (!state.instances[action.payload.pid]) return

			delete state.instances[action.payload.pid]

			state.zIndexes = state.zIndexes.filter((zIndex) => zIndex !== action.payload.pid)
		},
		runApplication(state: State, action: PayloadAction<{ aid: Applications, args: { [key: string]: string } }>) {
			const application = state.pool[action.payload.aid]

			const pid = generateID()

			switch (application.type) {
				case "daemon":
					state.instances[pid] = {
						args: action.payload.args,
						component: application.aid,
						displayName: application.displayName,
						icon: application.icon,
						pid,
						type: application.type,
					}
					break
				case "window":
					state.instances[pid] = {
						args: action.payload.args,
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
					break
				default:
					break
			}
		},
		sendToFront(state: State, action: PayloadAction<{ pid: string }>) {
			const instanceIndex = state.zIndexes.findIndex((zIndex) => zIndex === action.payload.pid)

			state.zIndexes.splice(instanceIndex, 1)
			state.zIndexes.push(action.payload.pid)
		},
		setBreakpoint(state: State, action: PayloadAction<{ pid: string; breakpoint: Breakpoints }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.breakpoint = action.payload.breakpoint
		},
		setDimensions(state: State, action: PayloadAction<{ pid: string; dimensions: Dimensions }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.dimensions = action.payload.dimensions
		},
		setDragging(state: State, action: PayloadAction<{ pid: string; dragging: boolean }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.dragging = action.payload.dragging

			state.dragging = action.payload.dragging
		},
		setPosition(state: State, action: PayloadAction<{ pid: string; position: Position }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.position = action.payload.position
		},
		setMaximized(state: State, action: PayloadAction<{ pid: string; maximized: Snap }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.maximized = action.payload.maximized
		},
		setMinimized(state: State, action: PayloadAction<{ pid: string; minimized: boolean }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.minimized = action.payload.minimized
		},
		setResizeMode(state: State, action: PayloadAction<{ pid: string; resizeMode: Resize }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.resizeMode = action.payload.resizeMode
		},
		setResizing(state: State, action: PayloadAction<{ pid: string; resizing: boolean }>) {
			const instance = state.instances[action.payload.pid]

			if (instance.type === "daemon") return

			instance.resizing = action.payload.resizing

			state.resizing = action.payload.resizing
		},
		setSnapShadowVisibility(state: State, action: PayloadAction<boolean>) {
			state.snapShadow.visible = action.payload
		},
		setSnapShadowPosition(state: State, action: PayloadAction<DomPosition>) {
			state.snapShadow.position = action.payload
		},
	},
})

export const {
	closeApplication,
	runApplication,
	sendToFront,
	setBreakpoint,
	setDimensions,
	setDragging,
	setMaximized,
	setMinimized,
	setPosition,
	setResizeMode,
	setResizing,
	setRunOnStartup,
	setSnapShadowPosition,
	setSnapShadowVisibility,
} = applicationsSlice.actions

export default applicationsSlice.reducer
