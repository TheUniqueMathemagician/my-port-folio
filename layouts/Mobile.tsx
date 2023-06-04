import { AnimatePresence } from "framer-motion"
import { FunctionComponent, PropsWithChildren, memo } from "react"

type MobileProps = PropsWithChildren

const Desktop: FunctionComponent<MobileProps> = ({ children }) => <AnimatePresence initial={false} exitBeforeEnter> {children} </AnimatePresence>

export default memo(Desktop)
