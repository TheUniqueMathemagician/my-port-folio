import {
  ElementType,
  MouseEvent,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "./Window.module.scss";
import { context as FrameContext } from "./WindowFrame";

interface State {
  onRed?: (e: MouseEvent) => void;
  onOrange?: (e: MouseEvent) => void;
  onGreen?: (e: MouseEvent) => void;
}

const Window: ElementType<State> = ({ children, onRed, onOrange, onGreen }) => {
  const minHeight = 300;
  const minWidth = 500;

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const frameContext = useContext(FrameContext);

  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;

    e.preventDefault();

    const card = cardRef.current;
    if (!card) return;

    setOffset({
      x: e.pageX - parseInt(card.style.left),
      y: e.pageY - parseInt(card.style.top),
    });

    setDragging(true);
  }, []);
  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      e.preventDefault();

      document.body.style.cursor = "grabbing";

      const header = headerRef.current;
      if (!header) return;

      let x = e.pageX - offset.x;
      let y = e.pageY - offset.y;

      if (x < frameContext.x1 - header.clientWidth + 10) {
        x = frameContext.x1 - header.clientWidth + 10;
      }
      if (y < frameContext.y1 - header.clientHeight + 10) {
        y = frameContext.y1 - header.clientHeight + 10;
      }
      if (x > frameContext.x2 - 10) {
        x = frameContext.x2 - 10;
      }
      if (y > frameContext.y2 - header.clientHeight) {
        y = frameContext.y2 - header.clientHeight;
      }

      setPosition({ x, y });
    },
    [offset, frameContext, headerRef]
  );
  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    document.body.style.cursor = "";
    e.preventDefault();
    setDragging(false);
  }, []);

  const redActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onRed) {
        onRed(e);
      }
    },
    [onRed]
  );
  const orangeActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onOrange) {
        onOrange(e);
      }
    },
    [onOrange]
  );
  const greenActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onGreen) {
        onGreen(e);
      }
    },
    [onGreen]
  );

  useLayoutEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    } else {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    }
    return () => {
      if (dragging) {
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      } else {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
    };
  }, [dragging, mouseMoveHandler, mouseUpHandler]);

  return (
    <section
      className={styles.window}
      style={{
        top: position.y,
        left: position.x,
        minHeight,
        minWidth,
      }}
      ref={cardRef}
      onDragStart={() => false}
      draggable="false"
    >
      <div
        className={styles.header}
        onMouseDown={mouseDownHandler}
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onDrag={() => false}
        draggable="false"
        ref={headerRef}
      >
        <button
          className={styles.red}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => redActionHandler(e)}
        ></button>
        <button
          className={styles.orange}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => orangeActionHandler(e)}
        ></button>
        <button
          className={styles.green}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => greenActionHandler(e)}
        ></button>
      </div>
      <div className={styles.background}>{children}</div>
    </section>
  );
};

export default Window;
