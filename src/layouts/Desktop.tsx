import Index from "../pages/Index";
import Error404 from "../pages/Error404";
import { Switch, Route } from "react-router-dom";

const Desktop = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Index></Index>
        </Route>
        <Route path="*">
          <Error404></Error404>
        </Route>
      </Switch>
    </>
  );
};

export default Desktop;
