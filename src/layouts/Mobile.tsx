import Error404 from "../pages/mobile/Error404";
import { Switch, Route } from "react-router-dom";

const Mobile = () => {
  return (
    <Switch>
      <Route exact path="/">
        <div>Mobile Home</div>
      </Route>
      <Route path="boot">
        <div>Mobile Boot</div>
      </Route>
      <Route path="workspace">
        <div>Mobile Workspace</div>
      </Route>
      <Route path="*">
        <Error404></Error404>
      </Route>
    </Switch>
  );
};

export default Mobile;
