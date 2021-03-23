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
import { BoundariesContext } from "./WindowFrame";

interface Props {
  onRed?: (e: MouseEvent) => void;
  onOrange?: (e: MouseEvent) => void;
  onGreen?: (e: MouseEvent) => void;
  sendToFront?: () => void;
  zIndex?: number;
}

type SnapState = null | "top" | "left" | "right";

interface PositionState {
  x: number | "50%" | "100%";
  y: number | "50%" | "100%";
}

interface OffsetState {
  x: number;
  y: number;
}

const Window: ElementType<Props> = ({
  children,
  onRed,
  onOrange,
  onGreen,
  sendToFront,
  zIndex,
}) => {
  const [minHeight, setMinHeight] = useState<number>(0);
  const [minWidth, setMinWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(300);
  const [width, setWidth] = useState<number>(500);
  const [snap, setSnap] = useState<SnapState>(null);
  const [offset, setOffset] = useState<OffsetState>({ x: 0, y: 0 });
  const [position, setPosition] = useState<PositionState>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);

  const boundariesContext = useContext(BoundariesContext);

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const mainMouseDownHandler = useCallback(() => {
    if (!sendToFront) return;
    sendToFront();
  }, [sendToFront]);
  const mouseDownHandler = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    const card = windowRef.current;
    if (!card) return;
    e.preventDefault();

    setOffset({
      x: e.pageX - parseInt(card.style.left),
      y: e.pageY - parseInt(card.style.top),
    });

    setDragging(true);
  }, []);
  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      e.preventDefault();

      const header = headerRef.current;
      if (!header) return;

      let position: PositionState = {
        x: e.pageX - offset.x,
        y: e.pageY - offset.y,
      };

      if (!snap) {
        if (position.x < boundariesContext.x1 - header.clientWidth + 10) {
          position.x = boundariesContext.x1 - header.clientWidth + 10;
        }
        if (position.y < boundariesContext.y1) {
          position.y = boundariesContext.y1;
        }
        if (position.x > boundariesContext.x2 - 10) {
          position.x = boundariesContext.x2 - 10;
        }
        if (position.y > boundariesContext.y2 - header.clientHeight) {
          position.y = boundariesContext.y2 - header.clientHeight;
        }
      }

      if (e.pageX - 1 <= boundariesContext.x1) {
        position.x = 0;
        position.y = 0;
        setSnap("left");
      } else if (e.pageX + 1 >= boundariesContext.x2) {
        position.x = "50%";
        position.y = 0;
        setSnap("right");
      } else if (e.pageY - 1 <= boundariesContext.y1) {
        position.x = 0;
        position.y = 0;
        setSnap("top");
      } else {
        setSnap(null);
      }

      setPosition(position);
    },
    [offset, boundariesContext, headerRef, snap]
  );
  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
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
      if (sendToFront) {
        sendToFront();
      }
    },
    [onRed, sendToFront]
  );
  const orangeActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onOrange) {
        onOrange(e);
      }
      if (sendToFront) {
        sendToFront();
      }
    },
    [onOrange, sendToFront]
  );
  const greenActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onGreen) {
        onGreen(e);
      }
      if (sendToFront) {
        sendToFront();
      }
    },
    [onGreen, sendToFront]
  );

  useLayoutEffect(() => {
    document.body.style.cursor = dragging ? "grabbing" : "";
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    if (dragging) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }
    return () => {
      document.body.style.cursor = dragging ? "grabbing" : "";
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [dragging, mouseMoveHandler, mouseUpHandler]);
  useLayoutEffect(() => {
    const header = headerRef.current;
    const window = windowRef.current;
    if (!header || !window) return;
    if (!snap) {
      window.style.transition = "";
      const offset: OffsetState = {
        x: width / 2,
        y: header.clientHeight / 2,
      };
      setOffset(offset);
    } else {
      window.style.transition = "top 0.2s ease, left 0.2s ease";
    }
  }, [snap, width]);

  return (
    <section
      className={styles.window}
      style={{
        zIndex,
        top: position.y,
        left: position.x,
        minHeight,
        minWidth,
        height: snap ? "100%" : height,
        width: snap === "top" ? "100%" : snap ? "50%" : width,
      }}
      ref={windowRef}
      onDragStart={() => false}
      draggable="false"
      onMouseDown={mainMouseDownHandler}
    >
      <div
        className={styles.header}
        onMouseDown={mouseDownHandler}
        style={{
          cursor: dragging ? "grabbing" : "grab",
          borderRadius: snap ? "0" : "",
        }}
        onDragStart={() => false}
        draggable="false"
        ref={headerRef}
      >
        <button
          className={styles.red}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => redActionHandler(e)}
          onMouseDown={(e) => e.stopPropagation()}
        ></button>
        <button
          className={styles.orange}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => orangeActionHandler(e)}
          onMouseDown={(e) => e.stopPropagation()}
        ></button>
        <button
          className={styles.green}
          style={{ pointerEvents: dragging ? "none" : "all" }}
          onClick={(e) => greenActionHandler(e)}
          onMouseDown={(e) => e.stopPropagation()}
        ></button>
      </div>
      <div
        className={styles.background}
        style={{ borderRadius: snap ? "0" : "" }}
        draggable="false"
      >
        {children}
      </div>
    </section>
  );
};

export default Window;
