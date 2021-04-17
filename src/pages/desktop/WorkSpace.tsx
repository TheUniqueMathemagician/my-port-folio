import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import TaskBar from "../../components/TaskBar";
import WindowFrame from "../../components/WindowFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";

const Main = () => {
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
