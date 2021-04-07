import { useCallback, useLayoutEffect, useState, useRef } from "react";
import WindowInstance from "../data/classes/WindowInstance";
import { useInstances } from "../data/Instances";
import IBoundaries from "../types/IBoundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

const WindowFrame = () => {
  // Contexts

  const { instances } = useInstances();

  // States

  const [boundaries, setBoundaries] = useState<IBoundaries>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

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

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      {instances
        .filter((app) => app instanceof WindowInstance)
        .map((app) => (
          <Window
            application={app as WindowInstance}
            boundaries={boundaries}
            borderOffset={16}
            resizerWidth={4}
            key={app.id}
          ></Window>
        ))}
    </div>
  );
};

export default WindowFrame;
