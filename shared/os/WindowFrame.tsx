import { useSelector } from "@/hooks/Store"
import { Boundaries } from "@/types/Boundaries"
import { ColorScheme } from "@/types/ColorScheme"
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import Window from "./Window"
import classes from "./WindowFrame.module.scss"

const WindowFrame: FC = () => {
	const instances = useSelector((store) => store.applications.instances)
	const ShadowPosition = useSelector((store) => store.applications.snapShadow.position)
	const shadowShown = useSelector((store) => store.applications.snapShadow.visible)
	const contrast = useSelector((store) => store.theme.colorScheme === ColorScheme.contrast)
	const dragging = useSelector((store) => store.applications.dragging)
	const resizing = useSelector((store) => store.applications.resizing)

	const [boundaries, setBoundaries] = useState<Boundaries>({ x1: 0, y1: 0, x2: 0, y2: 0 })

	const frameRef = useRef<HTMLDivElement>(null)

	const resizeHandler = useCallback(() => {
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
		resizeHandler()

		window.addEventListener("resize", resizeHandler)

		return () => { window.removeEventListener("resize", resizeHandler) }
	}, [resizeHandler])

	const rootClasses = [classes["root"]]
	const shadowClasses = [classes["shadow"]]

	if (contrast) shadowClasses.push(classes["contrast"])

	if (dragging) rootClasses.push(classes["dragging"])
	if (resizing) rootClasses.push(classes["resizing"])

	// TODO: put snap shadow in its own component
	return <div className={rootClasses.join(" ")} ref={frameRef}>
		<div
			style={{
				transitionDuration: shadowShown ? ".3s" : "",
				transitionTimingFunction: "ease",
				transitionProperty: "bottom, top,left,right",
				bottom: ShadowPosition.bottom ?? "",
				left: ShadowPosition.left ?? "",
				right: ShadowPosition.right ?? "",
				top: ShadowPosition.top ?? "",
				visibility: shadowShown ? "visible" : "collapse",
			}}
			className={shadowClasses.join(" ")}
		></div>
		{Object.keys(instances)
			.filter((key) => instances[key].type === "window")
			.map((key) => (
				<Window
					pid={key}
					boundaries={boundaries}
					borderOffset={16}
					resizerWidth={4}
					key={instances[key].pid}
				></Window>
			))}
	</div>
}

export default memo(WindowFrame)
