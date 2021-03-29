import Index from "../pages/desktop/Index";
import Error404 from "../pages/desktop/Error404";
import WorkSpace from "../pages/desktop/WorkSpace";

import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { useInstalledApplications } from "../data/InstalledApplications";
import { useOpenedApplications } from "../data/OpenedApplications";
import Application from "../shared/classes/Application";

import About from "../components/apps/About";
import Contact from "../components/apps/Contact";
import Snake from "../components/apps/Snake";
import Experiences from "../components/apps/Experiences";

const Desktop = () => {
  const { setInstalledApplications } = useInstalledApplications();
  const { setOpenedApplications } = useOpenedApplications();

  useEffect(() => {
    setInstalledApplications([
      new Application(
        require("../assets/images/applications/about.svg").default,
        "A Propos",
        About,
        setOpenedApplications
      ),
      new Application(
        require("../assets/images/applications/chat.svg").default,
        "Contact",
        Contact,
        setOpenedApplications
      ),
      new Application(
        require("../assets/images/applications/experience.svg").default,
        "Experiences",
        Experiences,
        setOpenedApplications
      ),
      new Application(
        require("../assets/images/applications/snake.svg").default,
        "Le serpent",
        Snake,
        setOpenedApplications
      )
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
