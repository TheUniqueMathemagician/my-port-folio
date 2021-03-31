import React, {
  createElement,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import WindowApplication from "../shared/classes/WindowApplication";
import Boundaries from "../shared/Boundaries";
import Snap from "../shared/Snap";
import Resize from "../shared/Resize";

import styles from "./Window.module.scss";

interface Props {
  application: WindowApplication;
  boundaries: Boundaries;
  borderOffset: number;
  resizerWidth: number;
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
  boundaries,
  borderOffset,
  resizerWidth
}) => {
  // Refs

  const windowRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // States

  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({
    bottom: null,
    left: null,
    right: null,
    top: null
  });
  const [dragging, setDragging] = useState<boolean>(false);
  const [resizing, setResizing] = useState<boolean>(false);

  // Callbacks

  const handleWindowMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      application.sendToFront();
    },
    [application]
  );

  const handleDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const window = windowRef.current;
      if (!window) return;
      e.preventDefault();

      setOffset({
        x: e.pageX - (parseInt(window.style.left) || 0),
        y: e.pageY - (parseInt(window.style.top) || 0)
      });

      if (!resizing) setDragging(true);
    },
    [windowRef, resizing]
  );

  const handleDragMouseMove = useCallback(
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

  const handleDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleRedClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      application.close();
    },
    [application]
  );

  const handleOrangeClick = useCallback(
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

  const handleGreenClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      application.minimized = true;
      application.sendToFront();
    },
    [application]
  );

  const handleResizerMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const resizer = resizerRef.current;
      const window = windowRef.current;

      if (!resizer || !window || resizing) return;

      const [x1, x2, y1, y2] = [
        window.offsetLeft,
        window.offsetLeft + window.clientWidth,
        window.offsetTop,
        window.offsetTop + window.clientHeight
      ];

      if (e.pageX >= x2 - 16 && e.pageY >= y2 - 16) {
        application.resize = Resize.bottomRight;
      } else if (e.pageY >= y2 - 16 && e.pageX <= x1 + 16) {
        application.resize = Resize.bottomLeft;
      } else if (e.pageX >= x2 - 16 && e.pageY <= y1 + 16) {
        application.resize = Resize.topRight;
      } else if (e.pageY <= y1 + 16 && e.pageX <= x1 + 16) {
        application.resize = Resize.topLeft;
      } else if (e.pageX >= x2 - resizerWidth) {
        application.resize = Resize.right;
      } else if (e.pageY >= y2 - resizerWidth) {
        application.resize = Resize.bottom;
      } else if (e.pageY <= y1 + resizerWidth) {
        application.resize = Resize.top;
      } else if (e.pageX <= x1 + resizerWidth) {
        application.resize = Resize.left;
      } else {
        application.resize = Resize.none;
      }
    },
    [resizerRef, resizing, application]
  );

  const handleResizerDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      const window = windowRef.current;
      if (!window) return;
      e.preventDefault();

      // setOffset({
      //   x: e.pageX - (parseInt(window.style.left) || 0),
      //   y: e.pageY - (parseInt(window.style.top) || 0)
      // });

      if (!dragging) setResizing(true);
    },
    [windowRef, dragging]
  );
  const handleResizerDragMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const window = windowRef.current;
      if (!window) return;
      const [x1, x2, y1, y2] = [
        window.offsetLeft,
        window.offsetLeft + window.clientWidth,
        window.offsetTop,
        window.offsetTop + window.clientHeight
      ];
      switch (application.resize) {
        case Resize.top:
          application.height = y2 - e.pageY;
          if (y2 - e.pageY > application.minHeight) {
            setPosition((state) => ({
              bottom: state.bottom,
              left: state.left,
              right: state.right,
              top: e.pageY
            }));
          }
          break;
        case Resize.bottom:
          application.height = e.pageY - y1;
          break;
        case Resize.left:
          application.width = x2 - e.pageX;
          if (x2 - e.pageX > application.minWidth) {
            setPosition((state) => ({
              bottom: state.bottom,
              left: e.pageX,
              right: state.right,
              top: state.top
            }));
          }
          break;
        case Resize.right:
          application.width = e.pageX - x1;
          break;
        // Strange issue when using resizerwidth to set border
        case Resize.topLeft:
          // const y = y2 - e.pageY - resizerWidth;
          // const x = x2 - e.pageX - resizerWidth;

          application.dimensions = {
            height: y2 - e.pageY,
            width: x2 - e.pageX
          };
          setPosition((state) => ({
            bottom: state.bottom,
            left: x2 - e.pageX > application.minWidth ? e.pageX : state.left,
            right: state.right,
            top: y2 - e.pageY > application.minHeight ? e.pageY : state.top
          }));
          break;
        case Resize.topRight:
          application.dimensions = {
            height: y2 - e.pageY,
            width: e.pageX - x1
          };
          setPosition((state) => ({
            bottom: state.bottom,
            left: state.left,
            right: e.pageX,
            top: e.pageY
          }));
          break;
        case Resize.bottomLeft:
          application.dimensions = {
            height: e.pageY - y1,
            width: x2 - e.pageX
          };
          setPosition((state) => ({
            bottom: state.bottom,
            left: e.pageX,
            right: state.right,
            top: state.top
          }));
          break;
        case Resize.bottomRight:
          application.dimensions = {
            height: e.pageY - y1,
            width: e.pageX - x1
          };
          break;
        default:
          break;
      }
    },
    [application, windowRef]
  );
  const handleResizerDragMouseUp = useCallback((e: globalThis.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(false);
  }, []);

  // Layout Effects

  useLayoutEffect(() => {
    if (dragging) {
      document.body.style.cursor = "grabbing";
      document.addEventListener("mousemove", handleDragMouseMove);
      document.addEventListener("mouseup", handleDragMouseUp);
    }
    return () => {
      if (dragging) {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", handleDragMouseMove);
        document.removeEventListener("mouseup", handleDragMouseUp);
      }
    };
  }, [dragging, handleDragMouseMove, handleDragMouseUp]);

  useLayoutEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleResizerDragMouseMove);
      document.addEventListener("mouseup", handleResizerDragMouseUp);
    }
    return () => {
      if (resizing) {
        document.removeEventListener("mousemove", handleResizerDragMouseMove);
        document.removeEventListener("mouseup", handleResizerDragMouseUp);
      }
    };
  }, [resizing, handleResizerDragMouseMove, handleResizerDragMouseUp]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (header && application.maximized) {
      setOffset({
        x: header.clientWidth / 2,
        y: header.clientHeight / 2
      });
    }
  }, [application.maximized]);

  // useLayoutEffect(() => {
  //   const header = headerRef.current;
  //   if (header && resizing) {
  //     setOffset({
  //       x: header.clientWidth / 2,
  //       y: header.clientHeight / 2
  //     });
  //   }
  // }, [resizing]);

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
  let width: null | number = null;
  let height: null | number = null;
  let top: PositionType | "" = "";
  let left: PositionType | "" = "";
  let right: PositionType | "" = "";
  let bottom: PositionType | "" = "";

  if (application.maximized && !dragging) {
    windowClasses.push(styles[`snap-${application.maximized}`]);
  } else {
    width = application.width;
    height = application.height;
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
      {/* TODO: move this to parent  */}
      <div className={windowShadowClasses.join(" ")}></div>

      <section
        className={windowClasses.join(" ")}
        style={{
          zIndex: application.zIndex,
          top,
          left,
          right,
          bottom,
          height: height ?? "",
          width: width ?? "",
          opacity: dragging ? "0.7" : "",
          visibility: application.minimized ? "collapse" : "visible"
        }}
        ref={windowRef}
        onDragStart={() => false}
        draggable="false"
        onMouseDown={handleWindowMouseDown}
      >
        <div
          ref={resizerRef}
          className={[styles["resizer"], styles[application.resize]].join(" ")}
          onMouseDown={handleResizerDragMouseDown}
          onMouseMove={handleResizerMouseMove}
        ></div>
        <div
          className={styles.header}
          onMouseDown={handleDragMouseDown}
          style={{
            cursor: resizing ? "default" : dragging ? "grabbing" : "grab"
          }}
          onDragStart={() => false}
          draggable="false"
          ref={headerRef}
        >
          <div className={styles["button-list"]}>
            <button
              className={styles.red}
              style={{ pointerEvents: dragging ? "none" : "all" }}
              onClick={(e) => handleRedClick(e)}
              onMouseDown={(e) => e.stopPropagation()}
            ></button>
            <button
              className={styles.orange}
              style={{ pointerEvents: dragging ? "none" : "all" }}
              onClick={(e) => handleOrangeClick(e)}
              onMouseDown={(e) => e.stopPropagation()}
            ></button>
            <button
              className={styles.green}
              style={{ pointerEvents: dragging ? "none" : "all" }}
              onClick={(e) => handleGreenClick(e)}
              onMouseDown={(e) => e.stopPropagation()}
            ></button>
          </div>
          <h2>{application.displayName}</h2>
        </div>
        <div className={styles["background"]}>
          {application.component
            ? createElement(application.component, {})
            : ""}
        </div>
      </section>
    </>
  );
};

export default Window;
