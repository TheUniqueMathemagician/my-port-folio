import Index from "../pages/desktop/Index";
import Error404 from "../pages/desktop/Error404";
import WorkSpace from "../pages/desktop/WorkSpace";
import Lock from "../pages/desktop/Lock";

import { Switch, Route, useHistory } from "react-router-dom";
import Boot from "../pages/desktop/Boot";
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
      <Route exact path="/">
        <Index></Index>
      </Route>
      <Route path="/boot">
        <Boot></Boot>
      </Route>
      <Route path="/lock">
        <Lock></Lock>
      </Route>
      <Route path="/workspace">
        <WorkSpace></WorkSpace>
      </Route>
      <Route path="*">
        <Error404></Error404>
      </Route>
    </Switch>
  );
};

export default Desktop;
