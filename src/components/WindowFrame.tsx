import { useCallback, useLayoutEffect, useState, useRef } from "react";
import Boundaries from "../shared/Boundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";
import { useRunningApplications } from "../data/RunningApplications";
import WindowApplication from "../shared/classes/WindowApplication";

const WindowFrame = () => {
  // Contexts

  const { runningApplications } = useRunningApplications();

  // States

  const [boundaries, setBoundaries] = useState<Boundaries>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

  const [zIndexes, setZIndexes] = useState<string[]>([]);

  // Refs

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Callbacks

  const resizeHandler = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    setBoundaries({
      x1: wrapper.offsetLeft,
      x2: wrapper.offsetLeft + wrapper.clientWidth,
      y1: wrapper.offsetTop,
      y2: wrapper.offsetTop + wrapper.clientHeight
    });
  }, []);

  // Layout Effects

  useLayoutEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  useLayoutEffect(() => {
    setZIndexes(runningApplications.map((app) => app.id));
  }, [runningApplications]);

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      {runningApplications
        .filter((app) => app instanceof WindowApplication)
        .map((app) => (
          <Window
            application={app as WindowApplication}
            boundaries={boundaries}
            // sendToFront={() => {
            //   const indexes = [...zIndexes];
            //   indexes.splice(indexes.indexOf(app.id), 1);
            //   indexes.push(app.id);
            //   setZIndexes(indexes);
            // }}
            // zIndex={zIndexes.indexOf(app.id)}
            key={app.id}
          ></Window>
        ))}
    </div>
  );
};

export default WindowFrame;
