import {AnimatePresence} from "framer-motion";
import type {FC} from "react";

const Desktop: FC = ({children}) => <AnimatePresence initial={false} exitBeforeEnter>{children}</AnimatePresence>;

export default Desktop;
