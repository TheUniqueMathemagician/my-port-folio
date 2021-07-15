import Boot from "../pages/desktop/Boot";
import Error404 from "../pages/desktop/Error404";
import Index from "../pages/desktop/Index";
import Lock from "../pages/desktop/Lock";
import WorkSpace from "../pages/desktop/WorkSpace";

import { AnimatePresence } from "framer-motion";

import { Switch, Route, useLocation } from "react-router-dom";

const Desktop = () => {
	const location = useLocation();

	return (
		<AnimatePresence initial={false} exitBeforeEnter>
			<Switch location={location} key={location.pathname}>
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
