import { useCallback, useState, useRef, useEffect } from "react";
import WindowInstance from "../data/classes/WindowInstance";
import { useInstances } from "../data/Instances";
import IBoundaries from "../types/IBoundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

const WindowFrame = () => {
  const { instances } = useInstances();

  const [boundaries, setBoundaries] = useState<IBoundaries>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

  const frameRef = useRef<HTMLDivElement>(null);

  const resizeHandler = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    setBoundaries({
      x1: frame.offsetLeft,
      x2: frame.offsetLeft + frame.clientWidth,
      y1: frame.offsetTop,
      y2: frame.offsetTop + frame.clientHeight
    });
  }, []);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div className={styles["window-frame"]} ref={frameRef}>
      {instances
        .filter((instance) => instance instanceof WindowInstance)
        .map((instance) => (
          <Window
            application={instance as WindowInstance}
            boundaries={boundaries}
            borderOffset={16}
            resizerWidth={4}
            key={instance.id}
          ></Window>
        ))}
    </div>
  );
};

export default WindowFrame;
