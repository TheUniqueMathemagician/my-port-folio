import Boot from "../pages/mobile/Boot";
import Error404 from "../pages/mobile/Error404";
import Index from "../pages/mobile/Index";
import Lock from "../pages/mobile/Lock";
import WorkSpace from "../pages/mobile/WorkSpace";

import { Switch, Route, useHistory } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useSelector } from "../hooks/Store";

import { AnimatePresence } from "framer-motion";

const Desktop = () => {
	const history = useHistory();

	const currentUser = useSelector((store) => store.users.currentUserID);

	useLayoutEffect(() => {
		if (!currentUser) {
			history.replace("/lock");
		}
	}, [currentUser, history]);

	return (
		<AnimatePresence initial={false} exitBeforeEnter>
			<Switch>
				<Route exact path="/" component={Index}></Route>
				<Route exact path="/boot" component={Boot}></Route>
				<Route exact path="/lock" component={Lock}></Route>
				<Route exact path="/workspace" component={WorkSpace}></Route>
				<Route exact path="*" component={Error404}></Route>
			</Switch>
		</AnimatePresence>
	);
};

export default Desktop;
