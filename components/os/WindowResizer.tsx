import { WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { Resize } from "@/types/Resize"
import { Snap } from "@/types/Snap"
import { useApplicationsStore } from "context/applications"
import React, { FunctionComponent, RefObject, memo, useCallback, useEffect, useRef } from "react"
import { fromEvent, throttleTime } from "rxjs"
import styles from "./WindowResizer.module.scss"

type Props = {
	pid: string
	width: number
	windowRef: RefObject<HTMLDivElement>
}

const cursors = new Map<Resize, string>([
	[Resize.bottom, "ns-resize"],
	[Resize.bottomLeft, "nesw-resize"],
	[Resize.bottomRight, "nwse-resize"],
	[Resize.left, "ew-resize"],
	[Resize.right, "ew-resize"],
	[Resize.top, "ns-resize"],
	[Resize.topLeft, "nwse-resize"],
	[Resize.topRight, "nesw-resize"],
])

const cssCursors = new Map<Resize, string>([
	[Resize.bottom, "resize-bottom"],
	[Resize.bottomLeft, "resize-bottom-left"],
	[Resize.bottomRight, "resize-bottom-right"],
	[Resize.left, "resize-left"],
	[Resize.right, "resize-right"],
	[Resize.top, "resize-top"],
	[Resize.topLeft, "resize-top-left"],
	[Resize.topRight, "resize-top-right"],
])

const WindowResizer: FunctionComponent<Props> = (props) => {
	const { pid, width, windowRef } = props

	const resizerRef = useRef<HTMLDivElement>(null)

	const resizable = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).resizable)
	const resizing = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).resizing)
	const resizeMode = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).resizeMode)
	const position = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).position)
	const maxDimensions = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).maxDimensions)
	const minDimensions = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).minDimensions)

	const setBreakpoint = useApplicationsStore((store) => store.setBreakpoint)
	const setDimensions = useApplicationsStore((store) => store.setDimensions)
	const setMaximized = useApplicationsStore((store) => store.setMaximized)
	const setPosition = useApplicationsStore((store) => store.setPosition)
	const setResizeMode = useApplicationsStore((store) => store.setResizeMode)
	const setResizing = useApplicationsStore((store) => store.setResizing)

	const handleResizerMouseMove = useCallback((e: React.MouseEvent) => {
		if (resizing || !resizable) return

		const resizer = resizerRef.current
		const window = windowRef.current

		if (!resizer || !window) return

		const [x1, x2, y1, y2] = [
			window.offsetLeft,
			window.offsetLeft + window.offsetWidth,
			window.offsetTop,
			window.offsetTop + window.offsetHeight,
		]

		if (e.pageX >= x2 - width && e.pageY >= y2 - width) {
			if (resizeMode !== Resize.bottomRight) setResizeMode(pid, Resize.bottomRight)
		} else if (e.pageY >= y2 - width && e.pageX <= x1 + width) {
			if (resizeMode !== Resize.bottomLeft) setResizeMode(pid, Resize.bottomLeft)
		} else if (e.pageX >= x2 - width && e.pageY <= y1 + width) {
			if (resizeMode !== Resize.topRight) setResizeMode(pid, Resize.topRight)
		} else if (e.pageY <= y1 + width && e.pageX <= x1 + width) {
			if (resizeMode !== Resize.topLeft) setResizeMode(pid, Resize.topLeft)
		} else if (e.pageX >= x2 - width) {
			if (resizeMode !== Resize.right) setResizeMode(pid, Resize.right)
		} else if (e.pageY >= y2 - width) {
			if (resizeMode !== Resize.bottom) setResizeMode(pid, Resize.bottom)
		} else if (e.pageY <= y1 + width) {
			if (resizeMode !== Resize.top) setResizeMode(pid, Resize.top)
		} else if (e.pageX <= x1 + width) {
			if (resizeMode !== Resize.left) setResizeMode(pid, Resize.left)
		} else {
			setResizeMode(pid, Resize.none)
		}
	}, [pid, resizable, resizeMode, resizing, setResizeMode, width, windowRef])

	const handleResizerDragMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0 || !resizable) return

		e.stopPropagation()
		e.preventDefault()

		document.body.style.cursor = cursors.get(resizeMode) || ""

		const window = windowRef.current

		if (!window) return

		const windowFrame = window.offsetParent as HTMLDivElement

		if (!windowFrame) return

		setMaximized(pid, Snap.none)
		setResizing(pid, true)
		setPosition(pid, {
			bottom: windowFrame.offsetHeight - window.offsetTop - window.offsetHeight,
			left: window.offsetLeft,
			right: windowFrame.offsetWidth - window.offsetLeft - window.offsetWidth,
			top: window.offsetTop,
		})
	}, [resizable, resizeMode, windowRef, setMaximized, pid, setResizing, setPosition])

	const handleResizerDragMouseMove = useCallback((e: globalThis.MouseEvent) => {
		const window = windowRef.current

		if (!window) return

		const windowFrame = window.offsetParent as HTMLDivElement

		if (!windowFrame) return

		const tmpPosition = {
			bottom: () => windowFrame.offsetHeight - e.pageY,
			left: () => e.pageX - windowFrame.offsetLeft,
			right: () => windowFrame.offsetWidth - e.pageX - windowFrame.offsetLeft,
			top: () => e.pageY - windowFrame.offsetTop,
		}

		const limit = {
			min: {
				bottom: () => windowFrame.offsetHeight - window.offsetTop - (maxDimensions.height ?? 0),
				left: () => window.offsetLeft + window.offsetWidth - (maxDimensions.width ?? 0),
				right: () => windowFrame.offsetWidth - window.offsetLeft - (maxDimensions.width ?? 0),
				top: () => window.offsetTop + window.offsetHeight - (maxDimensions.height ?? 0),
			},
			max: {
				bottom: () => windowFrame.offsetHeight - window.offsetTop - (minDimensions.height ?? 0),
				left: () => window.offsetLeft + window.offsetWidth - (minDimensions.width ?? 0),
				right: () => windowFrame.offsetWidth - window.offsetLeft - (minDimensions.width ?? 0),
				top: () => window.offsetTop + window.offsetHeight - (minDimensions.height ?? 0),
			},
		}

		let breakpoint = Breakpoints.xl

		if (window.offsetWidth <= 1200) breakpoint = Breakpoints.lg
		else if (window.offsetWidth <= 1024) breakpoint = Breakpoints.md
		else if (window.offsetWidth <= 768) breakpoint = Breakpoints.sm
		else breakpoint = Breakpoints.xs

		const dispatchPositionAndBreakpoint = ({ bottom, left, right, top }: { bottom?: number; left?: number; right?: number; top?: number }) => {
			setPosition(pid, {
				bottom: bottom !== undefined ? bottom : position.bottom,
				left: left !== undefined ? left : position.left,
				right: right !== undefined ? right : position.right,
				top: top !== undefined ? top : position.top,
			})
			setBreakpoint(pid, breakpoint)
		}

		const restrictedPosition = {
			top: () => {
				const top = tmpPosition.top()

				if (maxDimensions.height && top < limit.min.top()) return limit.min.top()
				if (minDimensions.height && top > limit.max.top()) return limit.max.top()
				if (top < 0) return 0

				return top
			},
			left: () => {
				const left = tmpPosition.left()

				if (maxDimensions.width && left < limit.min.left()) return limit.min.left()
				if (minDimensions.width && left > limit.max.left()) return limit.max.left()

				return left
			},
			bottom: () => {
				const bottom = tmpPosition.bottom()

				if (maxDimensions.height && bottom < limit.min.bottom()) return limit.min.bottom()
				if (minDimensions.height && bottom > limit.max.bottom()) return limit.max.bottom()

				return bottom
			},
			right: () => {
				const right = tmpPosition.right()

				if (maxDimensions.width && right < limit.min.right()) return limit.min.right()
				if (minDimensions.width && right > limit.max.right()) return limit.max.right()

				return right
			},
		}

		switch (resizeMode) {
			case Resize.top: {
				return dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
				})
			}
			case Resize.left: {
				return dispatchPositionAndBreakpoint({
					left: restrictedPosition.left(),
				})
			}
			case Resize.bottom: {
				return dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
				})
			}
			case Resize.right: {
				return dispatchPositionAndBreakpoint({
					right: restrictedPosition.right(),
				})
			}
			case Resize.topLeft: {
				return dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
					left: restrictedPosition.left(),
				})
			}
			case Resize.topRight: {
				return dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
					right: restrictedPosition.right(),
				})
			}
			case Resize.bottomLeft: {
				return dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
					left: restrictedPosition.left(),
				})
			}
			case Resize.bottomRight: {
				return dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
					right: restrictedPosition.right(),
				})
			}
			default:
				break
		}
	}, [
		windowRef,
		resizeMode,
		maxDimensions.height,
		maxDimensions.width,
		minDimensions.height,
		minDimensions.width,
		setBreakpoint,
		setPosition,
		pid,
		position.bottom,
		position.left,
		position.right,
		position.top,
	])

	const handleResizerDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		document.body.style.cursor = ""

		const window = windowRef.current

		if (!window) return

		setDimensions(pid, { height: window.offsetHeight, width: window.offsetWidth })
		setResizing(pid, false)
	}, [windowRef, setDimensions, pid, setResizing])

	useEffect(() => {
		if (resizing) {
			const s1 = fromEvent<globalThis.MouseEvent>(document, "mousemove")
				.pipe(throttleTime(5, undefined, { leading: true, trailing: true }))
				.subscribe(handleResizerDragMouseMove)
			const s2 = fromEvent<globalThis.MouseEvent>(document, "mouseup")
				.pipe(throttleTime(5, undefined, { leading: true, trailing: true }))
				.subscribe(handleResizerDragMouseUp)

			return () => {
				s1.unsubscribe()
				s2.unsubscribe()
			}
		}
	}, [handleResizerDragMouseMove, handleResizerDragMouseUp, resizing])

	const resizerClasses: string[] = [styles["window-resizer"]]
	const cssCursor = cssCursors.get(resizeMode)

	if (cssCursor) resizerClasses.push(styles[cssCursor])

	return <div
		className={resizerClasses.join(" ")}
		ref={resizerRef}
		onMouseMove={handleResizerMouseMove}
		onMouseDown={handleResizerDragMouseDown}
	></div>
}

export default memo(WindowResizer)
