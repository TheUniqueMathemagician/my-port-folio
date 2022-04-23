import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"

export type Page = NextPage & {
	layout?: (page: ReactElement) => ReactNode
}
