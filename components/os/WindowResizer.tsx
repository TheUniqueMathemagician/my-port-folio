import { WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { Resize } from "@/types/Resize"
import { Snap } from "@/types/Snap"
import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { FunctionComponent, MouseEvent, RefObject, memo, useCallback, useEffect, useRef } from "react"
import { animationFrameScheduler, fromEvent, throttleTime } from "rxjs"
import styles from "./WindowResizer.module.scss"

type WindowResizerProps = {
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

const WindowResizer: FunctionComponent<WindowResizerProps> = (props) => {
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

	const handleResizerMouseMove = useCallback((event: MouseEvent) => {
		if (resizing || !resizable) return

		const resizer = resizerRef.current
		const window = windowRef.current

		if (!resizer || !window) return

		const x1 = window.offsetLeft
		const x2 = window.offsetLeft + window.offsetWidth
		const y1 = window.offsetTop
		const y2 = window.offsetTop + window.offsetHeight

		if (event.pageX >= x2 - width && event.pageY >= y2 - width) {
			if (resizeMode !== Resize.bottomRight) setResizeMode(pid, Resize.bottomRight)
		} else if (event.pageY >= y2 - width && event.pageX <= x1 + width) {
			if (resizeMode !== Resize.bottomLeft) setResizeMode(pid, Resize.bottomLeft)
		} else if (event.pageX >= x2 - width && event.pageY <= y1 + width) {
			if (resizeMode !== Resize.topRight) setResizeMode(pid, Resize.topRight)
		} else if (event.pageY <= y1 + width && event.pageX <= x1 + width) {
			if (resizeMode !== Resize.topLeft) setResizeMode(pid, Resize.topLeft)
		} else if (event.pageX >= x2 - width) {
			if (resizeMode !== Resize.right) setResizeMode(pid, Resize.right)
		} else if (event.pageY >= y2 - width) {
			if (resizeMode !== Resize.bottom) setResizeMode(pid, Resize.bottom)
		} else if (event.pageY <= y1 + width) {
			if (resizeMode !== Resize.top) setResizeMode(pid, Resize.top)
		} else if (event.pageX <= x1 + width) {
			if (resizeMode !== Resize.left) setResizeMode(pid, Resize.left)
		} else {
			setResizeMode(pid, Resize.none)
		}
	}, [pid, resizable, resizeMode, resizing, setResizeMode, width, windowRef])

	const handleResizerDragMouseDown = useCallback((event: MouseEvent) => {
		if (event.button !== 0 || !resizable) return

		event.stopPropagation()
		event.preventDefault()

		document.body.style.cursor = cursors.get(resizeMode) ?? ""

		const window = windowRef.current

		if (!window) return

		const windowFrame = window.offsetParent as HTMLDivElement

		if (!windowFrame) return

		setMaximized(pid, Snap.None)
		setResizing(pid, true)
		setPosition(pid, {
			bottom: windowFrame.offsetHeight - window.offsetTop - window.offsetHeight,
			left: window.offsetLeft,
			right: windowFrame.offsetWidth - window.offsetLeft - window.offsetWidth,
			top: window.offsetTop,
		})
	}, [resizable, resizeMode, windowRef, setMaximized, pid, setResizing, setPosition])

	const handleResizerDragMouseMove = useCallback((event: globalThis.MouseEvent) => {
		const window = windowRef.current

		if (!window) return

		const windowFrame = window.offsetParent as HTMLDivElement

		if (!windowFrame) return

		const tmpPosition = {
			bottom: () => windowFrame.offsetHeight - event.pageY,
			left: () => event.pageX - windowFrame.offsetLeft,
			right: () => windowFrame.offsetWidth - event.pageX - windowFrame.offsetLeft,
			top: () => event.pageY - windowFrame.offsetTop,
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
				dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
				})
			}

				break
			case Resize.left: {
				dispatchPositionAndBreakpoint({
					left: restrictedPosition.left(),
				})
			}

				break
			case Resize.bottom: {
				dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
				})
			}

				break
			case Resize.right: {
				dispatchPositionAndBreakpoint({
					right: restrictedPosition.right(),
				})
			}

				break
			case Resize.topLeft: {
				dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
					left: restrictedPosition.left(),
				})

				break
			}
			case Resize.topRight: {
				dispatchPositionAndBreakpoint({
					top: restrictedPosition.top(),
					right: restrictedPosition.right(),
				})

				break
			}
			case Resize.bottomLeft: {
				dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
					left: restrictedPosition.left(),
				})

				break
			}
			case Resize.bottomRight: {
				dispatchPositionAndBreakpoint({
					bottom: restrictedPosition.bottom(),
					right: restrictedPosition.right(),
				})

				break
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
				.pipe(throttleTime(0, animationFrameScheduler, { leading: true, trailing: true }))
				.subscribe(handleResizerDragMouseMove)
			const s2 = fromEvent<globalThis.MouseEvent>(document, "mouseup")
				.pipe(throttleTime(0, animationFrameScheduler, { leading: true, trailing: true }))
				.subscribe(handleResizerDragMouseUp)

			return () => {
				s1.unsubscribe()
				s2.unsubscribe()
			}
		}

		return () => null
	}, [handleResizerDragMouseMove, handleResizerDragMouseUp, resizing])

	const resizerClassNameBuilder = ClassName.builder(styles["window-resizer"])
	const cssCursor = cssCursors.get(resizeMode)

	if (cssCursor) resizerClassNameBuilder.add(styles[cssCursor])

	return <div
		className={resizerClassNameBuilder.build()}
		ref={resizerRef}
		onMouseMove={handleResizerMouseMove}
		onMouseDown={handleResizerDragMouseDown}
	></div>
}

export default memo(WindowResizer)
