import {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  FunctionComponent
} from "react";
import { useApplications } from "../data/Applications";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

interface Boundaries {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const WindowFrame: FunctionComponent = ({ children }) => {
  // States

  const { applications, open } = useApplications();

  const [boundaries, setBoundaries] = useState<Boundaries>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

  const [zIndexes, setZIndexes] = useState<number[]>([]);

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

  // Effects

  useEffect(() => {
    open(new Date().toUTCString());
  }, [open]);

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
