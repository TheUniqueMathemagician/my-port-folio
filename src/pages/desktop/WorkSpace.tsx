import { useEffect } from "react";
import About from "../../components/apps/About";
import Contact from "../../components/apps/Contact";
import Experience from "../../components/apps/Experience";
import Snake from "../../components/apps/Snake";
import Welcome from "../../components/apps/Welome";
import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import TaskBar from "../../components/TaskBar";
import WindowFrame from "../../components/WindowFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";
import { useApplications } from "../../data/Applications";
import { useRunningApplications } from "../../data/RunningApplications";
import Application from "../../shared/classes/Application";

const Main = () => {
  const { setApplications } = useApplications();
  const { setRunningApplications } = useRunningApplications();
  useEffect(() => {
    setApplications(() => [
      new Application(
        setRunningApplications,
        "A Propos",
        require(`../../assets/images/applications/about.svg`).default,
        "A Propos",
        false,
        About,
        { width: 600, height: 400 }
      ),
      new Application(
        setRunningApplications,
        "Expérience",
        require(`../../assets/images/applications/experience.svg`).default,
        "Expérience",
        false,
        Experience,
        { width: 600, height: 400 }
      ),
      new Application(
        setRunningApplications,
        "Diplômes & Formations",
        require(`../../assets/images/applications/education.svg`).default,
        "Diplômes & Formations",
        false,
        Experience,
        { width: 600, height: 400 }
      ),
      new Application(
        setRunningApplications,
        "Contact",
        require(`../../assets/images/applications/contact.svg`).default,
        "Contact",
        false,
        Contact,
        { width: 600, height: 400 }
      ),
      new Application(
        setRunningApplications,
        "Le Serpent",
        require(`../../assets/images/applications/snake.svg`).default,
        "Le Serpent",
        false,
        Snake,
        { width: 600, height: 400 }
      ),
      new Application(
        setRunningApplications,
        "Bienvenue",
        require(`../../assets/images/applications/information.svg`).default,
        "",
        true,
        Welcome,
        { width: 600, height: 400 }
      )
    ]);
  }, [setApplications, setRunningApplications]);
  return (
    <ScreenFrame>
      <WorkspaceFrame>
        <ShortcutFrame></ShortcutFrame>
        <WindowFrame></WindowFrame>
      </WorkspaceFrame>
      <TaskBar></TaskBar>
    </ScreenFrame>
  );
};

export default Main;
