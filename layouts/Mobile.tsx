import { AnimatePresence } from "framer-motion"
import { FC, memo, ReactNode } from "react"

type Props = {
	children: ReactNode
}

const Desktop: FC<Props> = ({ children }) => <AnimatePresence initial={false} exitBeforeEnter> {children} </AnimatePresence>

export default memo(Desktop)
