import {AnimatePresence} from "framer-motion";
import {FC} from "react";
import {useSelector} from "../hooks/Store";


const Desktop: FC = ({children}) => {
  const currentUser = useSelector((store) => store.users.currentUserID);

  return <AnimatePresence initial={false} exitBeforeEnter> {children} </AnimatePresence>;
};

export default Desktop;
