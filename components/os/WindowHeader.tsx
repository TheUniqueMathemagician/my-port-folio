import { WindowInstance } from "@/types/Application"
import { Boundaries } from "@/types/Boundaries"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { Offset } from "@/types/Offset"
import { Snap } from "@/types/Snap"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FunctionComponent, MouseEvent, RefObject, memo, useCallback, useEffect, useRef, useState } from "react"
import { fromEvent, throttleTime } from "rxjs"
import classes from "./WindowHeader.module.scss"

type Props = {
	boundaries: Boundaries
	pid: string
	windowRef: RefObject<HTMLDivElement>
}

const WindowHeader: FunctionComponent<Props> = (props) => {
	const { pid, boundaries, windowRef } = props

	const headerRef = useRef<HTMLDivElement>(null)

	const contrast = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const dimensions = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).dimensions)
	const displayName = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).displayName)
	const dragging = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).dragging)
	const maximized = useApplicationsStore((store) => (store.instances[pid] as WindowInstance).maximized)
	const snapShadowVisible = useApplicationsStore((store) => store.snapShadow.visible)

	const closeApplication = useApplicationsStore((store) => store.closeApplication)
	const sendToFront = useApplicationsStore((store) => store.sendToFront)
	const setBreakpoint = useApplicationsStore((store) => store.setBreakpoint)
	const setDragging = useApplicationsStore((store) => store.setDragging)
	const setMaximized = useApplicationsStore((store) => store.setMaximized)
	const setMinimized = useApplicationsStore((store) => store.setMinimized)
	const setPosition = useApplicationsStore((store) => store.setPosition)
	const setSnapShadowPosition = useApplicationsStore((store) => store.setSnapShadowPosition)
	const setSnapShadowVisibility = useApplicationsStore((store) => store.setSnapShadowVisibility)

	const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
	const [snap, setSnap] = useState<Snap>(Snap.none)

	const handleDragDoubleClick = useCallback(() => setMaximized(pid, Snap.top), [setMaximized, pid])

	// #region button handlers

	const handleRedClick = useCallback((e: MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		closeApplication(pid)
	}, [closeApplication, pid])

	const handleOrangeClick = useCallback((e: MouseEvent) => {
		e.preventDefault()

		sendToFront(pid)
		setMaximized(pid, maximized ? Snap.none : Snap.top)
	}, [sendToFront, pid, setMaximized, maximized])

	const handleGreenClick = useCallback((e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		setMinimized(pid, true)
	}, [setMinimized, pid])

	const handleButtonMouseDown = useCallback((e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}, [])

	// #endregion

	// #region dragging handlers

	const handleDragMouseDown = useCallback((e: MouseEvent) => {
		if (e.button !== 0) return

		// E.preventDefault()

		if (maximized) {
			const header = headerRef.current

			if (header) {
				const x = (dimensions.width || 0) / 2
				const y = header.clientHeight / 2
				setOffset({ x, y })
			}
		} else {
			const window = windowRef.current

			if (window) {
				const x = e.pageX - window.offsetLeft
				const y = e.pageY - window.offsetTop
				setOffset({ x, y })
			}
		}

		document.body.style.cursor = "grabbing"

		setDragging(pid, true)
	}, [maximized, setDragging, pid, dimensions.width, windowRef])

	const handleDragMouseMove = useCallback((e: globalThis.MouseEvent) => {
		const header = headerRef.current

		if (!header) return

		e.stopPropagation()
		e.preventDefault()

		const shouldSnapToTop = e.pageY - 1 <= boundaries.y1
		const shouldSnapToBottom = e.pageY + 1 >= boundaries.y2
		const shouldSnapToLeft = e.pageX - 1 <= boundaries.x1
		const shouldSnapToRight = e.pageX + 1 >= boundaries.x2

		if (shouldSnapToTop && shouldSnapToLeft) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: "50%",
				top: 0,
				left: 0,
				right: "50%",
			})
			setSnap(Snap.topLeft)
		} else if (shouldSnapToTop && shouldSnapToRight) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: "50%",
				top: 0,
				left: "50%",
				right: 0,
			})
			setSnap(Snap.topRight)
		} else if (shouldSnapToBottom && shouldSnapToLeft) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: 0,
				top: "50%",
				left: 0,
				right: "50%",
			})

			setSnap(Snap.bottomLeft)
		} else if (shouldSnapToBottom && shouldSnapToRight) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: 0,
				top: "50%",
				left: "50%",
				right: 0,
			})

			setSnap(Snap.bottomRight)
		} else if (shouldSnapToTop) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
			})
			setSnap(Snap.top)
		} else if (shouldSnapToLeft) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: 0,
				top: 0,
				left: 0,
				right: "50%",
			})
			setSnap(Snap.left)
		} else if (shouldSnapToRight) {
			setSnapShadowVisibility(true)
			setSnapShadowPosition({
				bottom: 0,
				top: 0,
				left: "50%",
				right: 0,
			})
			setSnap(Snap.right)
		} else {
			if (snapShadowVisible) setSnapShadowVisibility(false)
			if (maximized) setMaximized(pid, Snap.none)

			setSnap(Snap.none)
		}

		const tmpPosition = {
			left: e.pageX - offset.x,
			top: e.pageY - offset.y,
			right: null,
			bottom: null,
		}

		setPosition(pid, tmpPosition)

		if (!snapShadowVisible) {
			const window = windowRef.current

			if (window) {
				const snapShadowPosition = {
					bottom:
						boundaries.y2
						- boundaries.y1
						- window.offsetTop
						- window.clientHeight,
					left: window.offsetLeft,
					right:
						boundaries.x2
						- boundaries.x1
						- window.offsetLeft
						- window.clientWidth,
					top: window.offsetTop,
				}

				setSnapShadowPosition(snapShadowPosition)
			}
		}
	}, [
		boundaries.x1,
		boundaries.x2,
		boundaries.y1,
		boundaries.y2,
		maximized,
		offset.x,
		offset.y,
		pid,
		setMaximized,
		setPosition,
		setSnapShadowPosition,
		setSnapShadowVisibility,
		snapShadowVisible,
		windowRef,
	])

	const handleDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
		document.body.style.cursor = ""

		setDragging(pid, false)
		setSnapShadowVisibility(false)
		setMaximized(pid, snap)
	}, [setDragging, pid, setSnapShadowVisibility, setMaximized, snap])

	// #endregion

	useEffect(() => {
		if (dragging) {
			const s1 = fromEvent<globalThis.MouseEvent>(document, "mousemove")
				.pipe(throttleTime(5, undefined, { leading: true, trailing: true }))
				.subscribe(handleDragMouseMove)
			const s2 = fromEvent<globalThis.MouseEvent>(document, "mouseup")
				.pipe(throttleTime(5, undefined, { leading: true, trailing: true }))
				.subscribe(handleDragMouseUp)

			return () => {
				s1.unsubscribe()
				s2.unsubscribe()
			}
		}
	}, [handleDragMouseMove, handleDragMouseUp, dragging])

	useEffect(() => {
		const window = windowRef.current

		if (!window) return

		let breakpoint = Breakpoints.xl

		if (window.offsetWidth <= 1200) breakpoint = Breakpoints.lg
		if (window.offsetWidth <= 1024) breakpoint = Breakpoints.md
		if (window.offsetWidth <= 768) breakpoint = Breakpoints.sm
		if (window.offsetWidth <= 480) breakpoint = Breakpoints.xs

		setBreakpoint(pid, breakpoint)
	}, [windowRef, pid, setBreakpoint])

	const rootClasses = [classes["root"]]

	if (contrast) rootClasses.push(classes["contrast"])

	return <div
		className={rootClasses.join(" ")}
		ref={headerRef}
		onMouseDown={handleDragMouseDown}
		onDoubleClick={handleDragDoubleClick}
		draggable={false}
	>
		<div className={classes["button-list"]}>
			<button
				className={classes["red"]}
				onClick={handleRedClick}
				onMouseDown={handleButtonMouseDown}
			></button>
			<button
				className={classes["orange"]}
				onClick={handleOrangeClick}
				onMouseDown={handleButtonMouseDown}
			></button>
			<button
				className={classes["green"]}
				onClick={handleGreenClick}
				onMouseDown={handleButtonMouseDown}
			></button>
		</div>
		<h3 className={classes["title"]}>{displayName}</h3>
	</div>
}

export default memo(WindowHeader)
