"use client"

import { Analytics } from "@vercel/analytics/react"
import { useThemeStore } from "context/theme"
import { useMemo, type FunctionComponent, type PropsWithChildren } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const Styles: FunctionComponent = () => {
	const palette = useThemeStore((store) => store.palette)
	const colorScheme = useThemeStore((store) => store.colorScheme)

	const colorPropertiesString = useMemo(() => {
		const colorProperties = []

		for (const key in palette) {
			const paletteKey = key as keyof typeof palette

			const value = palette[paletteKey]?.[colorScheme]

			if (!value) continue

			colorProperties.push(`--cvos-${key}:${value};`)
			colorProperties.push(`--cvos-${key}-20:${value}14;`)
			colorProperties.push(`--cvos-${key}-33:${value}55;`)
			colorProperties.push(`--cvos-${key}-50:${value}80;`)
			colorProperties.push(`--cvos-${key}-67:${value}aa;`)
		}

		return `:root{${colorProperties.join("")}}`
	}, [palette, colorScheme])

	return <style>{colorPropertiesString}</style>
}

const client = new QueryClient()

const Setup: FunctionComponent<PropsWithChildren> = (props) => {
	const { children } = props

	return <QueryClientProvider client={client}>
		<Styles />
		{children}
		<Analytics />
	</QueryClientProvider>
}

export default Setup
