import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { ClassName } from "@/utils/ClassName"
import { useApplicationsStore } from "context/applications"
import { useThemeStore } from "context/theme"
import { FunctionComponent, memo, useCallback, useEffect, useRef, useState } from "react"
import { animationFrameScheduler, fromEvent, throttleTime } from "rxjs"
import Window from "./Window"
import classes from "./WindowFrame.module.scss"

const WindowFrame: FunctionComponent = () => {
	const instanceKeys = useApplicationsStore((store) => Object.keys(store.instances), (a, b) => a.length === b.length)
	const isContrasted = useThemeStore((store) => store.colorScheme === ColorScheme.contrast)
	const isDragging = useApplicationsStore((store) => store.dragging)
	const isResizing = useApplicationsStore((store) => store.resizing)
	const isShadowVisible = useApplicationsStore((store) => store.snapShadow.visible)
	const shadowPosition = useApplicationsStore((store) => store.snapShadow.position)

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
			.pipe(throttleTime(0, animationFrameScheduler, { leading: true, trailing: true }))
			.subscribe(handleResize)

		return () => {
			resizeSubscription.unsubscribe()
		}
	}, [handleResize])

	const classNameBuilder = ClassName.builder(classes["root"])
	const shadowClassNameBuilder = ClassName.builder(classes["shadow"])

	if (isContrasted) shadowClassNameBuilder.add(classes["contrast"])
	if (isDragging) classNameBuilder.add(classes["dragging"])
	if (isResizing) classNameBuilder.add(classes["resizing"])

	// TODO: put snap shadow in its own component
	return <div className={classNameBuilder.build()} ref={frameRef}>
		<div
			style={{
				bottom: shadowPosition.bottom ?? undefined,
				left: shadowPosition.left ?? undefined,
				right: shadowPosition.right ?? undefined,
				top: shadowPosition.top ?? undefined,
				transitionDuration: isShadowVisible ? ".3s" : undefined,
				visibility: isShadowVisible ? "visible" : "collapse",
			}}
			className={shadowClassNameBuilder.build()}
		></div>
		{instanceKeys
			.map((key) => <Window
				borderOffset={16}
				boundaries={boundaries}
				key={key}
				pid={key}
				resizerWidth={4}
			/>)}
	</div>
}

export default memo(WindowFrame)
