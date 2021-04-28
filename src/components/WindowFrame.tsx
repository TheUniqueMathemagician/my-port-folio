import { useCallback, useState, useRef, useEffect } from "react";
import { useSelector } from "../hooks/Store";
import { WindowInstance } from "../store/reducers/Instances";
import { IBoundaries } from "../types/IBoundaries";
import Window from "./Window";

import styles from "./WindowFrame.module.scss";

const WindowFrame = () => {
  const instances = useSelector((store) => store.instances.elements);
  const ShadowPosition = useSelector(
    (store) => store.instances.snapShadow.position
  );
  const shadowShown = useSelector(
    (store) => store.instances.snapShadow.visible
  );

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
      <div
        style={{
          transitionDuration: shadowShown ? ".3s" : "",
          transitionTimingFunction: "ease",
          transitionProperty: "all",
          bottom: ShadowPosition.bottom ?? "",
          left: ShadowPosition.left ?? "",
          right: ShadowPosition.right ?? "",
          top: ShadowPosition.top ?? "",
          visibility: shadowShown ? "visible" : "collapse"
        }}
        className={styles["window-shadow"]}
      ></div>
      {Object.keys(instances)
        .filter((key) => instances[key].type === "window")
        .map((key) => (
          <Window
            application={instances[key] as WindowInstance}
            boundaries={boundaries}
            borderOffset={16}
            resizerWidth={4}
            key={instances[key].id}
          ></Window>
        ))}
    </div>
  );
};

export default WindowFrame;
