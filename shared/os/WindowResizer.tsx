import { WindowInstance } from "@/types/Application"
import { Breakpoints } from "@/types/Breakpoints"
import { Resize } from "@/types/Resize"
import { Snap } from "@/types/Snap"
import React, { FC, memo, RefObject, useCallback, useEffect, useMemo, useRef } from "react"
import { batch } from "react-redux"
import { useDispatch, useSelector } from "../../hooks/Store"
import { setBreakpoint, setDimensions, setMaximized, setPosition, setResizeMode, setResizing } from "../../store/slices/Applications"
import styles from "./WindowResizer.module.scss"

interface Props {
	pid: string
	windowRef: RefObject<HTMLDivElement>
	width: number
}

const WindowResizer: FC<Props> = (props) => {
	const { pid, width, windowRef } = props

	const cursor = useMemo(() =>
		new Map<Resize, string>([
			[Resize.top, "ns-resize"],
			[Resize.bottom, "ns-resize"],
			[Resize.left, "ew-resize"],
			[Resize.right, "ew-resize"],
			[Resize.topLeft, "nwse-resize"],
			[Resize.topRight, "nesw-resize"],
			[Resize.bottomLeft, "nesw-resize"],
			[Resize.bottomRight, "nwse-resize"],
		]),
		[]
	)

	const csscursor = useMemo(() =>
		new Map<Resize, string>([
			[Resize.top, "resize-top"],
			[Resize.bottom, "resize-bottom"],
			[Resize.left, "resize-left"],
			[Resize.right, "resize-right"],
			[Resize.topLeft, "resize-top-left"],
			[Resize.topRight, "resize-top-right"],
			[Resize.bottomLeft, "resize-bottom-left"],
			[Resize.bottomRight, "resize-bottom-right"],
		]),
		[]
	)

	const resizerRef = useRef<HTMLDivElement>(null)

	const dispatch = useDispatch()

	const resizable = useSelector((store) => store.applications.instances[pid] as WindowInstance).resizable
	const resizing = useSelector((store) => store.applications.instances[pid] as WindowInstance).resizing
	const resizeMode = useSelector((store) => store.applications.instances[pid] as WindowInstance).resizeMode
	const position = useSelector((store) => store.applications.instances[pid] as WindowInstance).position
	const maxDimensions = useSelector((store) => store.applications.instances[pid] as WindowInstance).maxDimensions
	const minDimensions = useSelector((store) => store.applications.instances[pid] as WindowInstance).minDimensions

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
			if (resizeMode !== Resize.bottomRight) dispatch(setResizeMode({ pid, resizeMode: Resize.bottomRight }))
		} else if (e.pageY >= y2 - width && e.pageX <= x1 + width) {
			if (resizeMode !== Resize.bottomLeft) dispatch(setResizeMode({ pid, resizeMode: Resize.bottomLeft }))
		} else if (e.pageX >= x2 - width && e.pageY <= y1 + width) {
			if (resizeMode !== Resize.topRight) dispatch(setResizeMode({ pid, resizeMode: Resize.topRight }))
		} else if (e.pageY <= y1 + width && e.pageX <= x1 + width) {
			if (resizeMode !== Resize.topLeft) dispatch(setResizeMode({ pid, resizeMode: Resize.topLeft }))
		} else if (e.pageX >= x2 - width) {
			if (resizeMode !== Resize.right) dispatch(setResizeMode({ pid, resizeMode: Resize.right }))
		} else if (e.pageY >= y2 - width) {
			if (resizeMode !== Resize.bottom) dispatch(setResizeMode({ pid, resizeMode: Resize.bottom }))
		} else if (e.pageY <= y1 + width) {
			if (resizeMode !== Resize.top) dispatch(setResizeMode({ pid, resizeMode: Resize.top }))
		} else if (e.pageX <= x1 + width) {
			if (resizeMode !== Resize.left) dispatch(setResizeMode({ pid, resizeMode: Resize.left }))
		} else {
			dispatch(setResizeMode({ pid, resizeMode: Resize.none }))
		}
	},
		[pid, dispatch, width, windowRef, resizeMode, resizing, resizable, resizerRef]
	)

	const handleResizerDragMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0 || !resizable) return

		e.stopPropagation()
		e.preventDefault()

		document.body.style.cursor = cursor.get(resizeMode) || ""

		const window = windowRef.current

		if (!window) return

		const windowFrame = window.offsetParent as HTMLDivElement

		if (!windowFrame) return

		batch(() => {
			dispatch(setMaximized({ pid, maximized: Snap.none }))
			dispatch(setResizing({ pid, resizing: true }))
			dispatch(setPosition({
				pid,
				position: {
					bottom:
						windowFrame.offsetHeight -
						window.offsetTop -
						window.offsetHeight,
					left: window.offsetLeft,
					right:
						windowFrame.offsetWidth -
						window.offsetLeft -
						window.offsetWidth,
					top: window.offsetTop,
				},
			})
			)
		})
	}, [dispatch, windowRef, pid, resizable, resizeMode, cursor])

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
				bottom: () =>
					windowFrame.offsetHeight -
					window.offsetTop -
					(maxDimensions.height ?? 0),
				left: () =>
					window.offsetLeft + window.offsetWidth - (maxDimensions.width ?? 0),
				right: () =>
					windowFrame.offsetWidth -
					window.offsetLeft -
					(maxDimensions.width ?? 0),
				top: () =>
					window.offsetTop + window.offsetHeight - (maxDimensions.height ?? 0),
			},
			max: {
				bottom: () =>
					windowFrame.offsetHeight -
					window.offsetTop -
					(minDimensions.height ?? 0),
				left: () =>
					window.offsetLeft + window.offsetWidth - (minDimensions.width ?? 0),
				right: () =>
					windowFrame.offsetWidth -
					window.offsetLeft -
					(minDimensions.width ?? 0),
				top: () =>
					window.offsetTop + window.offsetHeight - (minDimensions.height ?? 0),
			},
		}

		let breakpoint = Breakpoints.xl

		if (window.offsetWidth <= 1200) breakpoint = Breakpoints.lg
		if (window.offsetWidth <= 1024) breakpoint = Breakpoints.md
		if (window.offsetWidth <= 768) breakpoint = Breakpoints.sm
		if (window.offsetWidth <= 480) breakpoint = Breakpoints.xs

		const dispatchPositionAndBreakpoint = ({ bottom, left, right, top }: { bottom?: number; left?: number; right?: number; top?: number }) => {
			batch(() => {
				dispatch(
					setPosition({
						pid,
						position: {
							bottom: bottom !== undefined ? bottom : position.bottom,
							left: left !== undefined ? left : position.left,
							right: right !== undefined ? right : position.right,
							top: top !== undefined ? top : position.top,
						},
					})
				)
				dispatch(setBreakpoint({ pid, breakpoint }))
			})
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
	}, [pid, windowRef, dispatch, minDimensions, maxDimensions, resizeMode, position])

	const handleResizerDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		document.body.style.cursor = ""

		const window = windowRef.current

		if (!window) return

		batch(() => {
			dispatch(
				setDimensions({
					pid,
					dimensions: {
						height: window.offsetHeight,
						width: window.offsetWidth,
					},
				})
			)
			dispatch(setResizing({ pid, resizing: false }))
		})
	}, [dispatch, windowRef, pid])

	useEffect(() => {
		if (resizing) {
			document.addEventListener("mousemove", handleResizerDragMouseMove)
			document.addEventListener("mouseup", handleResizerDragMouseUp)

			return () => {
				document.removeEventListener("mousemove", handleResizerDragMouseMove)
				document.removeEventListener("mouseup", handleResizerDragMouseUp)
			}
		}
	}, [resizing, resizeMode, handleResizerDragMouseMove, handleResizerDragMouseUp])

	const resizerClasses: string[] = [styles["window-resizer"]]

	resizerClasses.push(styles[csscursor.get(resizeMode) ?? ""])

	return <div
		className={resizerClasses.join(" ")}
		ref={resizerRef}
		onMouseMove={handleResizerMouseMove}
		onMouseDown={handleResizerDragMouseDown}
	></div>
}

export default memo(WindowResizer)
