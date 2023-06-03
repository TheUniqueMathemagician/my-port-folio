import { FunctionComponent } from "react"
import { Breakpoints } from "./Breakpoints"
import { Dimensions } from "./Dimensions"
import { Position } from "./Position"
import { Resize } from "./Resize"
import { Snap } from "./Snap"

export type Argument = string | number | boolean | null

export type Arguments = Record<string, Argument>

export const enum ApplicationId {
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
	Welcome,
}

export type Application = {
	readonly applicationId: ApplicationId
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
	readonly applicationId: ApplicationId
	readonly args: Arguments
	readonly displayName: string
	readonly icon: string
	readonly pid: string
}

export interface DaemonInstance extends Instance {
	type: "daemon"
}

export interface WindowInstance extends Instance {
	breakpoint: Breakpoints
	dimensions: Dimensions
	dragging: boolean
	maxDimensions: Dimensions
	maximized: Snap
	minDimensions: Dimensions
	minimized: boolean
	position: Position
	resizable: boolean
	resizeMode: Resize
	resizing: boolean
	type: "window"
}

export type RunningApplicationComponent = FunctionComponent<{
	args: Arguments
	pid: string
}>
