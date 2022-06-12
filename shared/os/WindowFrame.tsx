import { useSelector } from "@/hooks/Store"
import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import { fromEvent, throttleTime } from "rxjs"
import Window from "./Window"
import classes from "./WindowFrame.module.scss"

const WindowFrame: FC = () => {
	const instances = useSelector((store) => store.applications.instances)
	const isContrasted = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const isDragging = useSelector((store) => store.applications.dragging)
	const isResizing = useSelector((store) => store.applications.resizing)
	const isShadowVisible = useSelector((store) => store.applications.snapShadow.visible)
	const shadowPosition = useSelector((store) => store.applications.snapShadow.position)

	const [boundaries, setBoundaries] = useState<Boundaries>({ x1: 0, y1: 0, x2: 0, y2: 0 })

	const frameRef = useRef<HTMLDivElement>(null)

	const handleResize = useCallback(() => {
		const frame = frameRef.current

		if (!frame) return

		setBoundaries({
			x1: frame.offsetLeft,
			x2: frame.offsetLeft + frame.clientWidth,
			y1: frame.offsetTop,
			y2: frame.offsetTop + frame.clientHeight,
		})
	}, [])

	useEffect(() => {
		handleResize()

		const resizeSubscription = fromEvent(window, "resize")
			.pipe(throttleTime(5, undefined, { leading: true, trailing: true }))
			.subscribe(handleResize)

		return () => { resizeSubscription.unsubscribe() }
	}, [handleResize])

	const rootClasses = [classes["root"]]
	const shadowClasses = [classes["shadow"]]

	if (isContrasted) shadowClasses.push(classes["contrast"])

	if (isDragging) rootClasses.push(classes["dragging"])
	if (isResizing) rootClasses.push(classes["resizing"])

	// TODO: put snap shadow in its own component
	return <div className={rootClasses.join(" ")} ref={frameRef}>
		<div
			style={{
				transitionDuration: isShadowVisible ? ".3s" : "",
				transitionTimingFunction: "ease",
				transitionProperty: "bottom,top,left,right",
				bottom: shadowPosition.bottom ?? "",
				left: shadowPosition.left ?? "",
				right: shadowPosition.right ?? "",
				top: shadowPosition.top ?? "",
				visibility: isShadowVisible ? "visible" : "collapse",
			}}
			className={shadowClasses.join(" ")}
		></div>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "window")
			.map((key) => <Window
				pid={key}
				boundaries={boundaries}
				borderOffset={16}
				resizerWidth={4}
				key={instances[key].pid}
			/>
			)}
	</div>
}

export default memo(WindowFrame)
