import { WindowInstance } from "@/types/Application"
import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { Position } from "@/types/Position"
import { createElement, FC, memo, MouseEventHandler, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "../../hooks/Store"
import { applicationsMap, sendToFront } from "../../store/slices/Applications"
import classes from "./Window.module.scss"
import WindowHeader from "./WindowHeader"
import WindowResizer from "./WindowResizer"

interface Props {
	borderOffset: number
	boundaries: Boundaries
	pid: string
	resizerWidth: number
}

const Window: FC<Props> = ({ pid, boundaries, borderOffset, resizerWidth }) => {
	const windowRef = useRef<HTMLDivElement>(null)

	const zIndexes = useSelector((store) => store.applications.zIndexes)
	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const maximized = useSelector((store) => (store.applications.instances[pid] as WindowInstance).maximized)
	const minimized = useSelector((store) => (store.applications.instances[pid] as WindowInstance).minimized)
	const dimensions = useSelector((store) => (store.applications.instances[pid] as WindowInstance).dimensions)
	const position = useSelector((store) => (store.applications.instances[pid] as WindowInstance).position)
	const dragging = useSelector((store) => (store.applications.instances[pid] as WindowInstance).dragging)
	const resizing = useSelector((store) => (store.applications.instances[pid] as WindowInstance).resizing)
	const component = useSelector((store) => (store.applications.instances[pid] as WindowInstance).component)
	const args = useSelector((store) => (store.applications.instances[pid] as WindowInstance).args)

	const dispatch = useDispatch()

	const handleWindowMouseDown: MouseEventHandler<HTMLElement> = useCallback((e) => {
		if (e.button !== 0) return
		if (zIndexes.findIndex((id) => id === pid) !== zIndexes.length - 1) dispatch(sendToFront({ pid }))
	}, [dispatch, pid, zIndexes])

	const handleWindowFocus = useCallback(() => {
		if (zIndexes.findIndex((id) => id === pid) !== zIndexes.length - 1) dispatch(sendToFront({ pid }))
	}, [dispatch, pid, zIndexes])

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
			zIndex,
			top: tmpPosition.top ?? "",
			left: tmpPosition.left ?? "",
			bottom: tmpPosition.bottom ?? "",
			right: tmpPosition.right ?? "",
			height: height,
			width: width,
			opacity: dragging ? "0.7" : "",
			visibility: minimized ? "collapse" : "visible",
		}}
		ref={windowRef}
		onDragStart={() => false}
		draggable="false"
		onMouseDown={handleWindowMouseDown}
	>
		<WindowResizer
			pid={pid}
			windowRef={windowRef}
			width={resizerWidth}
		></WindowResizer>
		<WindowHeader
			pid={pid}
			boundaries={boundaries}
			windowRef={windowRef}
		></WindowHeader>
		<div className={backgroundClasses.join(" ")}>
			{renderComponent ? createElement(renderComponent, { args, pid }) : null}
		</div>
	</section>
}

export default memo(Window)
