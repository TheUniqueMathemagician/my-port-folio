import { createContext, ElementType, useCallback, useEffect } from "react";

const context = createContext({ dragging: false });

interface State {}

const WindowFrame: ElementType<State> = ({ children }) => {
  const MouseMoveHandler = useCallback((e: globalThis.MouseEvent) => {
    // console.log("move");
  }, []);

  const MouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    // console.log("up");
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", MouseMoveHandler);
    document.addEventListener("mouseup", MouseUpHandler);
    return () => {
      document.removeEventListener("mousemove", MouseMoveHandler);
      document.removeEventListener("mouseup", MouseUpHandler);
    };
  }, [MouseMoveHandler, MouseUpHandler]);

  return (
    <div>
      <context.Provider value={{ dragging: false }}>
        {children}
      </context.Provider>
    </div>
  );
};

export default WindowFrame;
