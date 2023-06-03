import { AnimatePresence } from "framer-motion"
import { FunctionComponent, PropsWithChildren, memo } from "react"

type Props = PropsWithChildren

const Desktop: FunctionComponent<Props> = ({ children }) => <AnimatePresence initial={false} exitBeforeEnter>{children}</AnimatePresence>

export default memo(Desktop)
