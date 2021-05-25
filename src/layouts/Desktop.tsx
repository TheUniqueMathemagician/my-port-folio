import Boot from "../pages/desktop/Boot";
import Error404 from "../pages/desktop/Error404";
import Index from "../pages/desktop/Index";
import Lock from "../pages/desktop/Lock";
import WorkSpace from "../pages/desktop/WorkSpace";

import { Switch, Route, useHistory } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useSelector } from "../hooks/Store";

const Desktop = () => {
  const history = useHistory();
  const currentUser = useSelector((store) => store.users.currentUserID);

  useLayoutEffect(() => {
    if (!currentUser) {
      history.replace("/lock");
    }
  }, [currentUser, history]);

  return (
    <Switch>
      <Route exact path="/" component={Index}></Route>
      <Route exact path="/boot" component={Boot}></Route>
      <Route exact path="/lock" component={Lock}></Route>
      <Route exact path="/workspace" component={WorkSpace}></Route>
      <Route exact path="*" component={Error404}></Route>
    </Switch>
  );
};

export default Desktop;
