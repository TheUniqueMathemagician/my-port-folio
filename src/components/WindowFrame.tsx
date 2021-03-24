import {
  Children,
  cloneElement,
  createContext,
  ElementType,
  ReactElement,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
  useRef
} from "react";

import styles from "./WindowFrame.module.scss";

interface BoundariesState {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
const BoundariesContext = createContext<BoundariesState>({
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
});

interface Props {}

const WindowFrame: ElementType<Props> = ({ children }) => {
  const [boundaries, setBoundaries] = useState<BoundariesState>({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });
  const [zIndex, setZIndex] = useState<number[]>(
    Children.map(children, (_, i) => i) ?? []
  );

  const wrapperRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  useEffect(() => {
    setZIndex(Children.map(children, (_, i) => i) ?? []);
  }, [children]);

  return (
    <div className={styles["window-frame"]} ref={wrapperRef}>
      <BoundariesContext.Provider value={boundaries}>
        {Children.map(children, (child, i) => {
          if (!isValidElement(child)) return;
          return cloneElement(child as ReactElement<any>, {
            zIndex: zIndex.indexOf(i),
            sendToFront: () => {
              const _zIndex = [...zIndex];
              _zIndex.push(_zIndex.splice(_zIndex.indexOf(i), 1)[0]);
              setZIndex(_zIndex);
            }
          });
        })}
      </BoundariesContext.Provider>
    </div>
  );
};

export default WindowFrame;

export { BoundariesContext };
