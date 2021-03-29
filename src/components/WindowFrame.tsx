import { useCallback, useLayoutEffect, useState, useRef } from "react";
import { useInstalledApplications } from "../data/InstalledApplications";
import { useOpenedApplications } from "../data/OpenedApplications";
import Application from "../shared/classes/Application";
import Boundaries from "../shared/types/Boundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

const WindowFrame = () => {
  // Contexts

  const { openedApplications, setOpenedApplications } = useOpenedApplications();
  const { installedApplications } = useInstalledApplications();

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
    setZIndexes(openedApplications.map((app) => app.id));
  }, [openedApplications]);

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      <div className={styles["shortcuts"]}>
        {installedApplications.map((app) => (
          <button
            onDoubleClick={() => {
              setOpenedApplications([
                ...openedApplications,
                new Application(app.icon, app.name, app.component, app.renderer)
              ]);
            }}
            key={app.id}
          >
            <img
              src={require(`../assets/images/applications/${app.icon}`).default}
              alt={app.name}
            />
            <span>{app.name}</span>
          </button>
        ))}
      </div>
      {openedApplications.map((application) => (
        <Window
          application={application}
          boundaries={boundaries}
          sendToFront={() => {
            const indexes = [...zIndexes];
            indexes.splice(indexes.indexOf(application.id), 1);
            indexes.push(application.id);
            setZIndexes(indexes);
          }}
          zIndex={zIndexes.indexOf(application.id) + 1}
          key={application.id}
        ></Window>
      ))}
    </div>
  );
};

export default WindowFrame;
