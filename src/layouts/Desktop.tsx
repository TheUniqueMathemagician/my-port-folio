import Index from "../pages/desktop/Index";
import Error404 from "../pages/desktop/Error404";
import WorkSpace from "../pages/desktop/WorkSpace";
import Lock from "../pages/desktop/Lock";

import { Switch, Route } from "react-router-dom";
import Boot from "../pages/desktop/Boot";

const Desktop = () => {
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
