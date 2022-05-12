import { FC } from "react"
import About from "../../../shared/apps/About"
import Contact from "../../../shared/apps/Contact"
import Image from "../../../shared/apps/Image"
import Manager from "../../../shared/apps/Manager"
import Maps from "../../../shared/apps/Maps"
import NightWatcher from "../../../shared/apps/NightWatcher"
import Projects from "../../../shared/apps/Projects"
import Randit from "../../../shared/apps/Randit"
import Settings from "../../../shared/apps/Settings"
import Snake from "../../../shared/apps/Snake"
import Welcome from "../../../shared/apps/Welcome"
import { Applications } from "./Types"

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

interface RunApp {
	args: any
	pid: string
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
