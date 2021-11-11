import {AnimatePresence} from "framer-motion";
import {FC, memo} from "react";

const Desktop: FC = ({children}) => <AnimatePresence initial={false} exitBeforeEnter>{children}</AnimatePresence>;

export default memo(Desktop);
