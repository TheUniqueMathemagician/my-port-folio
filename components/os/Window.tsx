import { WindowInstance } from "@/types/Application"
import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { Position } from "@/types/Position"
import { Snap } from "@/types/Snap"
import { ClassName } from "@/utils/ClassName"
import { applicationsMap, useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FunctionComponent, MouseEventHandler, createElement, memo, useCallback, useRef } from "react"
import classes from "./Window.module.scss"
import WindowHeader from "./WindowHeader"
import WindowResizer from "./WindowResizer"

type WindowProps = {
	readonly borderOffset: number
	readonly boundaries: Boundaries
	readonly pid: string
	readonly resizerWidth: number
}

const Window: FunctionComponent<WindowProps> = ({ pid, boundaries, borderOffset, resizerWidth }) => {
	const windowRef = useRef<HTMLDivElement>(null)
	const args = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).args)
	const component = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).applicationId)
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

	// #region window rendering checks

	const classNameBuilder = ClassName.builder(classes["root"])
	const backgroundClassNameBuilder = ClassName.builder(classes["background"])

	let width: number | null = null
	let height: number | null = null
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

	if (maximized !== Snap.None) {
		classNameBuilder.add(classes[`snap-${maximized}`])
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

	if (contrast) classNameBuilder.add(classes["contrast"])

	const renderComponent = applicationsMap.get(component)

	return <section
		onFocus={() => sendToFront(pid)}
		className={classNameBuilder.build()}
		style={{
			bottom: tmpPosition.bottom ?? "",
			height: height ?? "",
			left: tmpPosition.left ?? "",
			right: tmpPosition.right ?? "",
			top: tmpPosition.top ?? "",
			visibility: minimized ? "collapse" : "visible",
			width: width ?? "",
			zIndex,
		}}
		ref={windowRef}
		onDragStart={() => false}
		draggable="false"
		onMouseDown={handleWindowMouseDown}
	>
		<WindowResizer pid={pid} width={resizerWidth} windowRef={windowRef}></WindowResizer>
		<WindowHeader boundaries={boundaries} pid={pid} windowRef={windowRef}></WindowHeader>
		<div className={backgroundClassNameBuilder.build()} style={{ pointerEvents: dragging ? "none" : "auto" }}>
			{renderComponent ? createElement(renderComponent, { args, pid }) : null}
		</div>
	</section>
}

export default memo(Window)
