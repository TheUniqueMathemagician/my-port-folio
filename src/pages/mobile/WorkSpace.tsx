import { useEffect } from "react";
import ActivityFrame from "../../components/ActivityFrame";
import ScreenFrame from "../../components/ScreenFrame";
import ShortcutFrame from "../../components/ShortcutFrame";
import WorkspaceFrame from "../../components/WorkspaceFrame";
import { useDispatch, useSelector } from "../../hooks/Store";
import { runApplication } from "../../store/slices/Applications";
import { setHasRanStartupApplications } from "../../store/slices/OS";

const WorkSpace = () => {
  const dispatch = useDispatch();

  const applications = useSelector((store) => store.applications.pool);
  const shouldStartApps = useSelector(
    (store) => !store.os.hasRanStartupApplications
  );

  useEffect(() => {
    if (shouldStartApps) {
      Object.keys(applications).forEach((key) => {
        const aid = +key;
        if (applications[aid].runOnStartup) {
          dispatch(runApplication({ aid, args: {} }));
        }
      });
      dispatch(setHasRanStartupApplications(true));
    }
  }, [dispatch, shouldStartApps, applications]);

  return (
    <ScreenFrame>
      <WorkspaceFrame>
        <ShortcutFrame></ShortcutFrame>
        <ActivityFrame></ActivityFrame>
      </WorkspaceFrame>
    </ScreenFrame>
  );
};

export default WorkSpace;
