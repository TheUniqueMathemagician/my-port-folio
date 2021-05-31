import { memo, useEffect } from "react";
import DaemonFrame from "../../components/DaemonFrame";
import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import TaskBar from "../../components/TaskBar";
import WindowFrame from "../../components/WindowFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/slices/Applications";
import { setHasRanStartupApplications } from "../../store/slices/OS";

const WorkSpace = () => {
  const dispatch = useDispatch();

  const applications = useSelector((store) => store.applications.pool);
  const hasRanStartupApplications = useSelector(
    (store) => store.os.hasRanStartupApplications
  );

  useEffect(() => {
    if (!hasRanStartupApplications) {
      Object.keys(applications).forEach((key) => {
        const aid = +key;
        if (applications[aid].runOnStartup) {
          dispatch(runApplication({ aid, args: {} }));
        }
      });
      dispatch(setHasRanStartupApplications(true));
    }
  }, [dispatch, hasRanStartupApplications, applications]);

  return (
    <>
      <DaemonFrame></DaemonFrame>
      <ScreenFrame>
        <WorkspaceFrame>
          <ShortcutFrame></ShortcutFrame>
          <WindowFrame></WindowFrame>
        </WorkspaceFrame>
        <TaskBar></TaskBar>
      </ScreenFrame>
    </>
  );
};

export default memo(WorkSpace);
