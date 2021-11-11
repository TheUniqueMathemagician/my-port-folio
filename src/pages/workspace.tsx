import {motion} from "framer-motion";
import {memo, useEffect} from "react";
import {useDispatch, useSelector} from "../hooks/Store";
import DaemonFrame from "../shared/os/DaemonFrame";
import ScreenFrame from "../shared/os/ScreenFrame";
import ShortcutFrame from "../shared/os/ShortcutFrame";
import TaskBar from "../shared/os/TaskBar";
import WindowFrame from "../shared/os/WindowFrame";
import WorkspaceFrame from "../shared/os/WorkspaceFrame";
import {runApplication} from "../store/slices/Applications";
import {setHasRanStartupApplications} from "../store/slices/OS";

const WorkSpace = () => {
  const dispatch = useDispatch();

  const applications = useSelector((store) => store.applications.pool);
  const hasRanStartupApplications = useSelector((store) => store.os.hasRanStartupApplications);

  useEffect(() => {
    if (!hasRanStartupApplications) {
      Object.keys(applications).forEach((key) => {
        const aid = +key;
        if (applications[aid].runOnStartup) dispatch(runApplication({aid, args: {}}));
      });
      dispatch(setHasRanStartupApplications(true));
    }
  }, [dispatch, hasRanStartupApplications, applications]);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.3}}
    >
      <DaemonFrame></DaemonFrame>
      <ScreenFrame>
        <WorkspaceFrame>
          <ShortcutFrame></ShortcutFrame>
          <WindowFrame></WindowFrame>
        </WorkspaceFrame>
        <TaskBar></TaskBar>
      </ScreenFrame>
    </motion.div>
  );
};

export default memo(WorkSpace);
