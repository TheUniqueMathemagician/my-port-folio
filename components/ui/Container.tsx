import { ClassName } from "@/utils/ClassName"
import { FunctionComponent, PropsWithChildren } from "react"
import classes from "./Container.module.scss"

type BoxProps = PropsWithChildren & {
	orientation?: undefined
	space?: boolean
	type?: undefined
}

type FlexProps = PropsWithChildren & {
	type: "flex"
	orientation?: "row" | "column"
	space?: boolean
}

type GridProps = PropsWithChildren & {
	type: "grid"
	orientation?: "row" | "column"
	space?: boolean
}

const Container: FunctionComponent<BoxProps | GridProps | FlexProps> = (props) => {
	const { children, orientation, space, type } = props

	const classNameBuilder = ClassName.builder(classes["root"])

	switch (orientation) {
		case "column":
			classNameBuilder.add(classes["column"])
			break
		case "row":
			classNameBuilder.add(classes["row"])
			break
	}

	if (space) classNameBuilder.add(classes["space"])

	switch (type) {
		case "flex":
			classNameBuilder.add(classes["flex"])
			break
		case "grid":
			classNameBuilder.add(classes["grid"])
			break
	}

	return <div className={classNameBuilder.build()}>{children}</div>
}

export default Container
