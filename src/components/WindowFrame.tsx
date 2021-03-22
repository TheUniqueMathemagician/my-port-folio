import {
  createContext,
  ElementType,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const context = createContext({ x1: 0, y1: 0, x2: 0, y2: 0 });

interface State {}

const WindowFrame: ElementType<State> = ({ children }) => {
  const [boundaries, setBoundaries] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  const resizeHandler = useCallback((e: globalThis.UIEvent) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    setBoundaries({
      x1: wrapper.offsetLeft,
      x2: wrapper.offsetLeft + wrapper.clientWidth,
      y1: wrapper.offsetTop,
      y2: wrapper.offsetTop + wrapper.clientHeight,
    });
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div ref={wrapperRef} style={{ height: "100%" }}>
      <context.Provider value={boundaries}>{children}</context.Provider>
    </div>
  );
};

export default WindowFrame;

export { context };
