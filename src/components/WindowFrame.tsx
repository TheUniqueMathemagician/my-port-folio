import { useCallback, useLayoutEffect, useState, useRef } from "react";
import { useOpenedApplications } from "../data/OpenedApplications";
import Boundaries from "../shared/types/Boundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

const WindowFrame = () => {
  // Contexts

  const [applications] = useOpenedApplications();

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
    setZIndexes(applications.map((app) => app.id));
  }, [applications]);

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      {applications.map((application) => {
        return (
          <Window
            application={application}
            boundaries={boundaries}
            sendToFront={() => {
              const indexes = [...zIndexes];
              indexes.splice(indexes.indexOf(application.id), 1);
              indexes.push(application.id);
              setZIndexes(indexes);
            }}
            zIndex={zIndexes.indexOf(application.id)}
            key={application.id}
          ></Window>
        );
      })}
    </div>
  );
};

export default WindowFrame;
