import {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import type { Application } from "../data/Applications";

import styles from "./Window.module.scss";

interface Props {
  application: Application;
  boundaries: { x1: number; x2: number; y1: number; y2: number };
  sendToFront: () => void;
  zIndex: number;
}

enum Snap {
  none,
  top,
  left,
  right
}

type PositionType = null | number | "50%" | "100%";
interface Position {
  bottom: PositionType;
  left: PositionType;
  right: PositionType;
  top: PositionType;
}

interface Offset {
  x: number;
  y: number;
}

const Window: FunctionComponent<Props> = ({
  application,
  boundaries,
  children,
  sendToFront,
  zIndex
}) => {
  // Locals

  const borderOffset = 16;

  // States

  const [minHeight] = useState<number>(500);
  const [minWidth] = useState<number>(300);
  // const [height, setHeight] = useState<number>(300);
  // const [width, setWidth] = useState<number>(500);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({
    bottom: null,
    left: null,
    right: null,
    top: null
  });
  const [snap, setSnap] = useState<Snap>(Snap.none);
  const [dragging, setDragging] = useState<boolean>(false);

  // Refs

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Callbacks

  const windowMouseDownHandler = useCallback(() => {
    sendToFront();
  }, [sendToFront]);

  const mouseDownHandler = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    const window = windowRef.current;
    if (!window) return;
    e.preventDefault();

    setOffset({
      x: e.pageX - (parseInt(window.style.left) || 0),
      y: e.pageY - (parseInt(window.style.top) || 0)
    });

    setDragging(true);
  }, []);

  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      const header = headerRef.current;
      if (!header) return;

      e.preventDefault();

      if (e.pageX - 1 <= boundaries.x1) {
        if (!(snap === Snap.left)) setSnap(Snap.left);
      } else if (e.pageX + 1 >= boundaries.x2) {
        if (!(snap === Snap.right)) setSnap(Snap.right);
      } else if (e.pageY - 1 <= boundaries.y1) {
        if (!(snap === Snap.top)) setSnap(Snap.top);
        application.maximized = true;
      } else {
        if (snap) setSnap(Snap.none);
        setPosition({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y,
          right: null,
          bottom: null
        });
        application.maximized = false;
      }
    },
    [offset, boundaries, headerRef, snap, application]
  );

  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const redActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      application.close();
    },
    [application]
  );

  const orangeActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      application.maximized = !application.maximized;
    },
    [application]
  );

  const greenActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      application.minimized = true;
    },
    [application]
  );

  // Layout Effects

  useLayoutEffect(() => {
    if (dragging) {
      document.body.style.cursor = "grabbing";
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }
    return () => {
      if (dragging) {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
      }
    };
  }, [dragging, mouseMoveHandler, mouseUpHandler]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (header && !snap) {
      setOffset({
        x: header.clientWidth / 2,
        y: header.clientHeight / 2
      });
    }
  }, [snap, application]);

  // Render

  let sectionClasses: string[] = [styles.window];
  let top: PositionType | "" = "";
  let left: PositionType | "" = "";
  let right: PositionType | "" = "";
  let bottom: PositionType | "" = "";

  if (application.maximized) {
    sectionClasses.push(styles["snap-top"]);
  } else if (snap) {
    switch (snap) {
      case Snap.left:
        sectionClasses.push(styles["snap-left"]);
        break;
      case Snap.right:
        sectionClasses.push(styles["snap-right"]);
        break;
    }
  } else {
    if (position.top) top = position.top;
    if (position.left) left = position.left;
    if (position.right) right = position.right;
    if (position.bottom) bottom = position.bottom;

    const header = headerRef.current;
    if (header) {
      if (position.left) {
        if (position.left < boundaries.x1 - header.clientWidth + borderOffset) {
          left = boundaries.x1 - header.clientWidth + borderOffset;
        }
        if (position.left > boundaries.x2 - borderOffset) {
          left = boundaries.x2 - borderOffset;
        }
      }
      if (position.top) {
        if (position.top < boundaries.y1) {
          top = boundaries.y1;
        }
        if (position.top > boundaries.y2 - header.clientHeight) {
          top = boundaries.y2 - header.clientHeight;
        }
      }
    }
  }

  return (
    <section
      className={sectionClasses.join(" ")}
      style={{
        zIndex,
        top,
        left,
        right,
        bottom,
        minHeight,
        minWidth,
        visibility: application.minimized ? "collapse" : "visible"
      }}
      ref={windowRef}
      onDragStart={() => false}
      draggable="false"
      onMouseDown={windowMouseDownHandler}
    >
      <div
        className={styles.header}
        onMouseDown={mouseDownHandler}
        style={{
          cursor: dragging ? "grabbing" : "grab"
        }}
        onDragStart={() => false}
        draggable="false"
        ref={headerRef}
      >
        <div>
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
        <div className="application-name">{application.name}</div>
      </div>
      <div className={styles.background}>{children}</div>
    </section>
  );
};

export default Window;
