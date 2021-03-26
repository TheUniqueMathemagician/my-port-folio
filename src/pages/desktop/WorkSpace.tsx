import DesktopFrame from "../../components/DesktopFrame";
import WindowFrame from "../../components/WindowFrame";
import TaskBar from "../../components/TaskBar";

const Main = () => {
  return (
    <DesktopFrame>
      <WindowFrame></WindowFrame>
      <TaskBar></TaskBar>
    </DesktopFrame>
  );
};

export default Main;
