import { AnimatePresence } from "framer-motion"
import { FunctionComponent, ReactNode, memo } from "react"

type Props = {
	children: ReactNode
}

const Desktop: FunctionComponent<Props> = ({ children }) => <AnimatePresence initial={false} exitBeforeEnter> {children} </AnimatePresence>

export default memo(Desktop)
