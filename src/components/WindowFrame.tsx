import {
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  FunctionComponent
} from "react";
import { useApplications, ActionType } from "../data/Applications";
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

  const [applications, dispatch] = useApplications();

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
    dispatch({
      type: ActionType.Open,
      payload: {
        name: "coucou"
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setZIndexes(applications.map((_, i) => i));
  }, [applications, setZIndexes]);

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      {applications.map((application, i) => {
        return (
          <Window
            application={application}
            boundaries={boundaries}
            sendToFront={() => {}}
            zIndex={1}
          ></Window>
        );
      })}
    </div>
  );
};

export default WindowFrame;
