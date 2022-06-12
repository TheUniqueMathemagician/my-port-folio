import { WindowInstance } from "@/types/Application"
import { Boundaries } from "@/types/Boundaries"
import { Breakpoints } from "@/types/Breakpoints"
import { ColorScheme } from "@/types/ColorScheme"
import { Offset } from "@/types/Offset"
import { Snap } from "@/types/Snap"
import { FC, memo, RefObject, useCallback, useEffect, useRef, useState } from "react"
import { batch } from "react-redux"
import { fromEvent, throttleTime } from "rxjs"
import { useDispatch, useSelector } from "../../hooks/Store"
import { closeApplication, sendToFront, setBreakpoint, setDragging, setMaximized, setMinimized, setPosition, setSnapShadowPosition, setSnapShadowVisibility } from "../../store/slices/Applications"
import classes from "./WindowHeader.module.scss"

type Props = {
	boundaries: Boundaries
	pid: string
	windowRef: RefObject<HTMLDivElement>
}

const WindowHeader: FC<Props> = (props) => {
	const { pid, boundaries, windowRef } = props

	const headerRef = useRef<HTMLDivElement>(null)

	const dispatch = useDispatch()

	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const snapShadowVisible = useSelector((store) => store.applications.snapShadow.visible)
	const maximized = useSelector((store) => (store.applications.instances[pid] as WindowInstance).maximized)
	const dimensions = useSelector((store) => (store.applications.instances[pid] as WindowInstance).dimensions)
	const dragging = useSelector((store) => (store.applications.instances[pid] as WindowInstance).dragging)
	const displayName = useSelector((store) => (store.applications.instances[pid] as WindowInstance).displayName)

	const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 })
	const [snap, setSnap] = useState<Snap>(Snap.none)

	const handleDragDoubleClick = useCallback(() => dispatch(setMaximized({ pid, maximized: Snap.top })), [pid, dispatch])

	// #region button handlers

	const handleRedClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		dispatch(closeApplication({ pid }))
	}, [dispatch, pid])

	const handleOrangeClick = useCallback((e: React.MouseEvent) => {
		e.preventDefault()

		batch(() => {
			dispatch(sendToFront({ pid }))
			dispatch(maximized ? setMaximized({ pid, maximized: Snap.none }) : setMaximized({ pid, maximized: Snap.top }))
		})
	}, [dispatch, pid, maximized])

	const handleGreenClick = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		dispatch(setMinimized({ pid, minimized: true }))
	}, [pid, dispatch])

	const handleButtonMouseDown = useCallback((e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}, [])

	// #endregion

	// #region dragging handlers

	const handleDragMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0) return

		e.preventDefault()

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

		dispatch(setDragging({ pid, dragging: true }))
	}, [maximized, dimensions.width, dispatch, pid, windowRef])

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
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: "50%",
						top: 0,
						left: 0,
						right: "50%",
					})
				)

				setSnap(Snap.topLeft)
			})
		} else if (shouldSnapToTop && shouldSnapToRight) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: "50%",
						top: 0,
						left: "50%",
						right: 0,
					})
				)

				setSnap(Snap.topRight)
			})
		} else if (shouldSnapToBottom && shouldSnapToLeft) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: 0,
						top: "50%",
						left: 0,
						right: "50%",
					})
				)

				setSnap(Snap.bottomLeft)
			})
		} else if (shouldSnapToBottom && shouldSnapToRight) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: 0,
						top: "50%",
						left: "50%",
						right: 0,
					})
				)

				setSnap(Snap.bottomRight)
			})
		} else if (shouldSnapToTop) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: 0,
						top: 0,
						left: 0,
						right: 0,
					})
				)

				setSnap(Snap.top)
			})
		} else if (shouldSnapToLeft) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: 0,
						top: 0,
						left: 0,
						right: "50%",
					})
				)

				setSnap(Snap.left)
			})
		} else if (shouldSnapToRight) {
			batch(() => {
				dispatch(setSnapShadowVisibility(true))
				dispatch(
					setSnapShadowPosition({
						bottom: 0,
						top: 0,
						left: "50%",
						right: 0,
					})
				)

				setSnap(Snap.right)
			})
		} else {
			batch(() => {
				if (snapShadowVisible) dispatch(setSnapShadowVisibility(false))
				if (maximized) dispatch(setMaximized({ pid, maximized: Snap.none }))

				setSnap(Snap.none)
			})
		}

		const tmpPosition = {
			left: e.pageX - offset.x,
			top: e.pageY - offset.y,
			right: null,
			bottom: null,
		}

		dispatch(setPosition({ pid, position: tmpPosition }))

		if (!snapShadowVisible) {
			const window = windowRef.current

			if (window) {
				const snapShadowPosition = {
					bottom:
						boundaries.y2 -
						boundaries.y1 -
						window.offsetTop -
						window.clientHeight,
					left: window.offsetLeft,
					right:
						boundaries.x2 -
						boundaries.x1 -
						window.offsetLeft -
						window.clientWidth,
					top: window.offsetTop,
				}

				dispatch(setSnapShadowPosition(snapShadowPosition))
			}
		}
	}, [
		boundaries.x1,
		boundaries.x2,
		boundaries.y1,
		boundaries.y2,
		dispatch,
		maximized,
		offset.x,
		offset.y,
		pid,
		snapShadowVisible,
		windowRef,
	])

	const handleDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
		e.stopPropagation()
		e.preventDefault()

		document.body.style.cursor = ""

		batch(() => {
			dispatch(setDragging({ pid, dragging: false }))
			dispatch(setSnapShadowVisibility(false))
			dispatch(setMaximized({ pid, maximized: snap }))
		})
	}, [pid, dispatch, snap])

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

		dispatch(setBreakpoint({ pid, breakpoint }))
	}, [windowRef, dispatch, pid])

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
