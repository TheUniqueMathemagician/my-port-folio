import {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import WindowApplication from "../shared/classes/WindowApplication";
import Boundaries from "../shared/Boundaries";
import Snap from "../shared/Snap";

import styles from "./Window.module.scss";

interface Props {
  application: WindowApplication;
  boundaries: Boundaries;
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

const Window: React.FunctionComponent<Props> = ({
  application,
  boundaries
}) => {
  // Refs

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Locals

  const borderOffset = 16;

  // States

  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({
    bottom: null,
    left: null,
    right: null,
    top: null
  });
  const [dragging, setDragging] = useState<boolean>(false);

  // Callbacks

  const windowMouseDownHandler = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      application.sendToFront();
    },
    [application]
  );

  const mouseDownHandler = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const window = windowRef.current;
      if (!window) return;
      e.preventDefault();

      setOffset({
        x: e.pageX - (parseInt(window.style.left) || 0),
        y: e.pageY - (parseInt(window.style.top) || 0)
      });

      setDragging(true);
    },
    [windowRef]
  );

  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      const header = headerRef.current;
      if (!header) return;

      e.stopPropagation();
      e.preventDefault();

      const shouldSnapToTop = e.pageY - 1 <= boundaries.y1;
      const shouldSnapToBottom = e.pageY + 1 >= boundaries.y2;
      const shouldSnapToLeft = e.pageX - 1 <= boundaries.x1;
      const shouldSnapToRight = e.pageX + 1 >= boundaries.x2;

      if (shouldSnapToTop && shouldSnapToLeft) {
        application.maximized = Snap.topLeft;
      } else if (shouldSnapToTop && shouldSnapToRight) {
        application.maximized = Snap.topRight;
      } else if (shouldSnapToBottom && shouldSnapToLeft) {
        application.maximized = Snap.bottomLeft;
      } else if (shouldSnapToBottom && shouldSnapToRight) {
        application.maximized = Snap.bottomRight;
      } else if (shouldSnapToTop) {
        application.maximized = Snap.top;
      } else if (shouldSnapToLeft) {
        application.maximized = Snap.left;
      } else if (shouldSnapToRight) {
        application.maximized = Snap.right;
      } else {
        application.maximized = Snap.none;
        setPosition({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y,
          right: null,
          bottom: null
        });
      }
    },
    [offset, boundaries, headerRef, application]
  );

  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
  }, []);

  const redActionHandler = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      application.close();
    },
    [application]
  );

  const orangeActionHandler = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      application.sendToFront();
      if (application.maximized) {
        application.maximized = Snap.none;
      } else {
        application.maximized = Snap.top;
      }
    },
    [application]
  );

  const greenActionHandler = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      application.minimized = true;
      application.sendToFront();
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
    if (header) {
      setOffset({
        x: header.clientWidth / 2,
        y: header.clientHeight / 2
      });
    }
  }, [application.maximized]);

  useLayoutEffect(() => {
    if (position.left || position.top) return;
    setPosition({
      bottom: null,
      left:
        (boundaries.x2 -
          boundaries.x1 -
          (windowRef.current?.clientWidth ?? 0)) /
        2,
      right: null,
      top:
        (boundaries.y2 -
          boundaries.y1 -
          (windowRef.current?.clientHeight ?? 0)) /
        2
    });
  }, [windowRef, boundaries, position]);

  // Render

  let windowClasses: string[] = [styles["window"]];
  let windowShadowClasses: string[] = [styles["window-shadow"]];
  let top: PositionType | "" = "";
  let left: PositionType | "" = "";
  let right: PositionType | "" = "";
  let bottom: PositionType | "" = "";

  if (application.maximized && !dragging) {
    windowClasses.push(styles[`snap-${application.maximized}`]);
  } else {
    if (application.maximized)
      windowShadowClasses.push(styles[`snap-${application.maximized}`]);
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
    <>
      <div className={windowShadowClasses.join(" ")}></div>
      <section
        className={windowClasses.join(" ")}
        style={{
          zIndex: application.zIndex,
          top,
          left,
          right,
          bottom,
          minHeight: application.minHeight ?? "",
          minWidth: application.minWidth ?? "",
          opacity: dragging ? "0.7" : "",
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
          <div className={styles["button-list"]}>
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
          <h2>{application.displayName}</h2>
        </div>
        <div className={styles.background}>
          {application.component
            ? createElement(application.component, {})
            : ""}
        </div>
      </section>
    </>
  );
};

export default Window;
