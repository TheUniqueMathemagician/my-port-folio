import { WindowInstance } from "@/types/Application"
import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { Position } from "@/types/Position"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { createElement, FC, memo, MouseEventHandler, useCallback, useRef } from "react"
import classes from "./Window.module.scss"
import WindowHeader from "./WindowHeader"
import WindowResizer from "./WindowResizer"

type Props = {
	readonly borderOffset: number
	readonly boundaries: Boundaries
	readonly pid: string
	readonly resizerWidth: number
}

const Window: FC<Props> = (props) => {
	const { pid, boundaries, borderOffset, resizerWidth } = props

	const windowRef = useRef<HTMLDivElement>(null)

	const args = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).args)
	const component = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).component)
	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const dimensions = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).dimensions)
	const dragging = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).dragging)
	const maximized = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).maximized)
	const minimized = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).minimized)
	const position = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).position)
	const resizing = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).resizing)
	const zIndexes = useApplicationsStore((store) => store.zIndexes)

	const sendToFront = useApplicationsStore((store) => store.sendToFront)

	const handleWindowMouseDown: MouseEventHandler<HTMLElement> = useCallback((e) => {
		if (e.button !== 0) return

		sendToFront(pid)
	}, [pid, sendToFront])

	const handleWindowFocus = useCallback(() => sendToFront(pid), [pid, sendToFront])

	// #region window rendering checks

	const rootClasses = [classes["root"]]
	const backgroundClasses = [classes["background"]]

	let width: number | "" = ""
	let height: number | "" = ""
	const tmpPosition: Position = {
		bottom: null,
		left: null,
		right: null,
		top: null,
	}

	const checkBoundaries = () => {
		if (position.left) {
			if (position.left < boundaries.x1 - (dimensions.width ?? 0) + borderOffset) tmpPosition.left = boundaries.x1 - (dimensions.width ?? 0) + borderOffset
			if (position.left > boundaries.x2 - borderOffset) tmpPosition.left = boundaries.x2 - borderOffset
		}
		if (position.top) {
			if (position.top < boundaries.y1) tmpPosition.top = boundaries.y1
			if (position.top > boundaries.y2 - borderOffset) tmpPosition.top = boundaries.y2 - borderOffset
		}
	}

	if (maximized) {
		rootClasses.push(classes[`snap-${maximized}`])
	} else if (resizing) {
		tmpPosition.top = position.top
		tmpPosition.left = position.left
		tmpPosition.right = position.right
		tmpPosition.bottom = position.bottom

		checkBoundaries()
	} else if (position.bottom === null && position.left === null && position.right === null && position.top === null) {
		tmpPosition.left = (boundaries.x2 - boundaries.x1 - (dimensions.width ?? 0)) / 2
		tmpPosition.top = (boundaries.y2 - boundaries.y1 - (dimensions.height ?? 0)) / 2

		width = dimensions.width ?? 0
		height = dimensions.height ?? 0

		checkBoundaries()
	} else {
		tmpPosition.top = position.top
		tmpPosition.left = position.left

		width = dimensions.width ?? 0
		height = dimensions.height ?? 0

		checkBoundaries()
	}

	// #endregion

	const zIndex = zIndexes.indexOf(pid)

	if (contrast) rootClasses.push(classes["contrast"])

	const renderComponent = applicationsMap.get(component)

	return <section
		onFocus={handleWindowFocus}
		className={rootClasses.join(" ")}
		style={{
			bottom: tmpPosition.bottom ?? "",
			height,
			left: tmpPosition.left ?? "",
			right: tmpPosition.right ?? "",
			top: tmpPosition.top ?? "",
			visibility: minimized ? "collapse" : "visible",
			width,
			zIndex,
		}}
		ref={windowRef}
		onDragStart={() => false}
		draggable="false"
		onMouseDown={handleWindowMouseDown}
	>
		<WindowResizer
			pid={pid}
			width={resizerWidth}
			windowRef={windowRef}
		></WindowResizer>
		<WindowHeader
			boundaries={boundaries}
			pid={pid}
			windowRef={windowRef}
		></WindowHeader>
		<div className={backgroundClasses.join(" ")} style={{ pointerEvents: dragging ? "none" : "auto" }}>
			{renderComponent ? createElement(renderComponent, { args, pid }) : null}
		</div>
	</section>
}

export default memo(Window)
