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

      if (e.pageX - 1 <= boundaries.x1) {
        application.maximized = Snap.left;
      } else if (e.pageX + 1 >= boundaries.x2) {
        application.maximized = Snap.right;
      } else if (e.pageY - 1 <= boundaries.y1) {
        application.maximized = Snap.top;
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
  }, [windowRef]);

  // Render

  let sectionClasses: string[] = [styles.window];
  let top: PositionType | "" = "";
  let left: PositionType | "" = "";
  let right: PositionType | "" = "";
  let bottom: PositionType | "" = "";

  if (application.maximized === Snap.top) {
    sectionClasses.push(styles["snap-top"]);
  } else if (application.maximized === Snap.left) {
    sectionClasses.push(styles["snap-left"]);
  } else if (application.maximized === Snap.right) {
    sectionClasses.push(styles["snap-right"]);
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
        <div className="application-name">{application.displayName}</div>
      </div>
      <div className={styles.background}>
        {application.component ? createElement(application.component, {}) : ""}
      </div>
    </section>
  );
};

export default Window;
