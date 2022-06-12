import { Breakpoints } from "./Breakpoints"
import { Dimensions } from "./Dimensions"
import { Position } from "./Position"
import { Resize } from "./Resize"
import { Snap } from "./Snap"

export enum Applications {
	About,
	Contact,
	Image,
	Manager,
	Maps,
	NightWatcher,
	Projects,
	Randit,
	Settings,
	Snake,
	Welcome
}

export type Application = {
	readonly aid: Applications
	readonly displayName: string
	readonly icon: string
	readonly shortcut: string
	runOnStartup: boolean
}

export interface DaemonApplication extends Application {
	readonly type: "daemon"
}

export interface WindowApplication extends Application {
	readonly dimensions: Dimensions
	readonly maxDimensions: Dimensions
	readonly minDimensions: Dimensions
	readonly position: Position
	readonly resizable: boolean
	readonly type: "window"
}

export type Instance = {
	readonly args: { [key: string]: string }
	readonly component: Applications
	readonly displayName: string
	readonly icon: string
	readonly pid: string
}

export interface DaemonInstance extends Instance {
	type: "daemon"
}

export interface WindowInstance extends Instance {
	breakpoint: Breakpoints
	position: Position
	dimensions: Dimensions
	minDimensions: Dimensions
	maxDimensions: Dimensions
	resizable: boolean
	resizeMode: Resize
	resizing: boolean
	dragging: boolean
	minimized: boolean
	maximized: Snap
	type: "window"
}
