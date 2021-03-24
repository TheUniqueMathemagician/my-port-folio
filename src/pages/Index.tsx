import TaskBar from "../components/TaskBar";
import Window from "../components/Window";
import WindowFrame from "../components/WindowFrame";

const Main = () => {
  return (
    <>
      <main>
        <WindowFrame>
          <Window></Window>
          <Window></Window>
          <Window></Window>
        </WindowFrame>
      </main>
      <TaskBar></TaskBar>
    </>
  );
};

export default Main;
