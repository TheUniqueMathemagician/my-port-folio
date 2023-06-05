import { AnimatePresence } from "framer-motion"
import { FunctionComponent, PropsWithChildren, memo } from "react"

type DesktopProps = PropsWithChildren

const Desktop: FunctionComponent<DesktopProps> = ({ children }) => <AnimatePresence initial={false} exitBeforeEnter>{children}</AnimatePresence>

export default memo(Desktop)
