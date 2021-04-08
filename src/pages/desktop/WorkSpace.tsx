import { useEffect } from "react";
import About from "../../components/apps/About";
import Contact from "../../components/apps/Contact";
import Education from "../../components/apps/Education";
import Experience from "../../components/apps/Experience";
import Manager from "../../components/apps/Manager";
import Snake from "../../components/apps/Snake";
import Welcome from "../../components/apps/Welcome";
import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import TaskBar from "../../components/TaskBar";
import WindowFrame from "../../components/WindowFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";
import { useApplications } from "../../data/Applications";
import WindowApplication from "../../data/classes/WindowApplication";

const Main = () => {
  const { setApplications } = useApplications();

  // TODO: Should we move the effect to /boot ?

  useEffect(() => {
    setApplications(() => [
      new WindowApplication(
        "Gestionnaire d'applications",
        require(`../../assets/images/applications/about.svg`).default,
        "",
        false,
        Manager
      ),
      new WindowApplication(
        "A Propos",
        require(`../../assets/images/applications/about.svg`).default,
        "A Propos",
        false,
        About
      ),
      new WindowApplication(
        "Expérience",
        require(`../../assets/images/applications/experience.svg`).default,
        "Expérience",
        false,
        Experience,
        { width: 600, height: 400 }
      ),
      new WindowApplication(
        "Diplômes & Formations",
        require(`../../assets/images/applications/education.svg`).default,
        "Diplômes & Formations",
        false,
        Education,
        { width: 600, height: 400 }
      ),
      new WindowApplication(
        "Contact",
        require(`../../assets/images/applications/contact.svg`).default,
        "Contact",
        false,
        Contact,
        { width: 600, height: 400 }
      ),
      new WindowApplication(
        "Le Serpent",
        require(`../../assets/images/applications/snake.svg`).default,
        "Le Serpent",
        false,
        Snake,
        { width: 600, height: 400 }
      ),
      new WindowApplication(
        "Bienvenue",
        require(`../../assets/images/applications/information.svg`).default,
        "",
        true,
        Welcome,
        { width: 600, height: 400 }
      )
    ]);
  }, [setApplications]);

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
