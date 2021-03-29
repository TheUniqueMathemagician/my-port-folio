import Index from "../pages/desktop/Index";
import Error404 from "../pages/desktop/Error404";
import WorkSpace from "../pages/desktop/WorkSpace";

import About from "../components/About";

import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useInstalledApplications } from "../data/InstalledApplications";
import { useOpenedApplications } from "../data/OpenedApplications";
import Application from "../shared/classes/Application";

const Desktop = () => {
  const { setInstalledApplications } = useInstalledApplications();
  const { setOpenedApplications } = useOpenedApplications();

  useEffect(() => {
    setInstalledApplications([
      new Application("about.svg", "About", About, setOpenedApplications)
    ]);
  }, [setOpenedApplications, setInstalledApplications]);

  return (
    <Switch>
      <Route exact path="/">
        <Index></Index>
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
