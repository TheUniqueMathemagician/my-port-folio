import { useEffect } from "react";
import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import TaskBar from "../../components/TaskBar";
import WindowFrame from "../../components/WindowFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/reducers/Instances";
import { setHasRanStartupApplications } from "../../store/reducers/OS";

const Main = () => {
  const dispatch = useDispatch();
  const applications = useSelector((store) => store.applications);
  const os = useSelector((store) => store.os);
  useEffect(() => {
    if (!os.hasRanStartupApplications) {
      Object.keys(applications).forEach((key) => {
        if (applications[key].runOnStartup) {
          dispatch(runApplication(applications[key]));
        }
      });
      dispatch(setHasRanStartupApplications(true));
    }
  }, [dispatch, os.hasRanStartupApplications, applications]);
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
