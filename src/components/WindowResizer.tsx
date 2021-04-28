import React, {
  FunctionComponent,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from "react";
import { useDispatch } from "../hooks/Store";
import {
  setMaximized,
  setDimensions,
  setPosition,
  setResizeMode,
  WindowInstance,
  setResizing
} from "../store/reducers/Instances";
import { EResize } from "../types/EResize";
import { ESnap } from "../types/ESnap";

import styles from "./WindowResizer.module.scss";

interface IProps {
  application: WindowInstance;
  windowRef: RefObject<HTMLDivElement>;
  width: number;
}

const WindowResizer: FunctionComponent<IProps> = ({
  application,
  width,
  windowRef
}) => {
  const resizerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleResizerMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (application.resizing) return;
      const resizer = resizerRef.current;
      const window = windowRef.current;

      if (!resizer || !window) return;

      const [x1, x2, y1, y2] = [
        window.offsetLeft,
        window.offsetLeft + window.clientWidth,
        window.offsetTop,
        window.offsetTop + window.clientHeight
      ];

      if (e.pageX >= x2 - width && e.pageY >= y2 - width) {
        if (application.resizeMode !== EResize.bottomRight) {
          dispatch(
            setResizeMode({ application, resizeMode: EResize.bottomRight })
          );
        }
      } else if (e.pageY >= y2 - width && e.pageX <= x1 + width) {
        if (application.resizeMode !== EResize.bottomLeft) {
          dispatch(
            setResizeMode({ application, resizeMode: EResize.bottomLeft })
          );
        }
      } else if (e.pageX >= x2 - width && e.pageY <= y1 + width) {
        if (application.resizeMode !== EResize.topRight) {
          dispatch(
            setResizeMode({ application, resizeMode: EResize.topRight })
          );
        }
      } else if (e.pageY <= y1 + width && e.pageX <= x1 + width) {
        if (application.resizeMode !== EResize.topLeft) {
          dispatch(setResizeMode({ application, resizeMode: EResize.topLeft }));
        }
      } else if (e.pageX >= x2 - width) {
        if (application.resizeMode !== EResize.right) {
          dispatch(setResizeMode({ application, resizeMode: EResize.right }));
        }
      } else if (e.pageY >= y2 - width) {
        if (application.resizeMode !== EResize.bottom) {
          dispatch(setResizeMode({ application, resizeMode: EResize.bottom }));
        }
      } else if (e.pageY <= y1 + width) {
        if (application.resizeMode !== EResize.top) {
          dispatch(setResizeMode({ application, resizeMode: EResize.top }));
        }
      } else if (e.pageX <= x1 + width) {
        if (application.resizeMode !== EResize.left) {
          dispatch(setResizeMode({ application, resizeMode: EResize.left }));
        }
      } else {
        dispatch(setResizeMode({ application, resizeMode: EResize.none }));
      }
    },
    [application, dispatch, width, windowRef]
  );

  const handleResizerDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();

      const window = windowRef.current;
      if (!window) return;
      const windowFrame = window.offsetParent;
      if (!windowFrame) return;

      const windowBC = window.getBoundingClientRect();
      const windowFrameBC = windowFrame.getBoundingClientRect();

      dispatch(setMaximized({ application, maximized: ESnap.none }));
      dispatch(setResizing({ application, resizing: true }));
      dispatch(
        setPosition({
          application,
          position: {
            bottom: windowFrameBC.height - windowBC.bottom - windowFrameBC.top,
            left: windowBC.left - windowFrameBC.left,
            right: windowFrameBC.width - windowBC.right - windowFrameBC.left,
            top: windowBC.top - windowFrameBC.top
          }
        })
      );
    },
    [dispatch, windowRef, application]
  );

  const handleResizerDragMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const window = windowRef.current;
      if (!window) return;
      const windowFrame = window.offsetParent;
      if (!windowFrame) return;

      const windowBC = window.getBoundingClientRect();
      const windowFrameBC = windowFrame.getBoundingClientRect();

      const position = {
        bottom: () => windowFrameBC.height - e.pageY - windowFrameBC.top,
        left: () => e.pageX - windowFrameBC.left,
        right: () => windowFrameBC.width - e.pageX - windowFrameBC.left,
        top: () => e.pageY - windowFrameBC.top
      };

      const limit = {
        min: {
          bottom: () =>
            windowFrameBC.height -
            windowFrameBC.top -
            windowBC.top -
            (application.maxDimensions.height ?? 0),
          left: () =>
            windowBC.right -
            windowFrameBC.left -
            (application.maxDimensions.width ?? 0),
          right: () =>
            windowFrameBC.width -
            windowFrameBC.left -
            windowBC.left -
            (application.maxDimensions.width ?? 0),
          top: () =>
            windowBC.bottom -
            windowFrameBC.top -
            (application.maxDimensions.height ?? 0)
        },
        max: {
          bottom: () =>
            windowFrameBC.height -
            windowFrameBC.top -
            windowBC.top -
            (application.minDimensions.height ?? 0),
          left: () =>
            windowBC.right -
            windowFrameBC.left -
            (application.minDimensions.width ?? 0),
          right: () =>
            windowFrameBC.width -
            windowFrameBC.left -
            windowBC.left -
            (application.minDimensions.width ?? 0),
          top: () =>
            windowBC.bottom -
            windowFrameBC.top -
            (application.minDimensions.height ?? 0)
        }
      };

      const dispatchPosition = ({
        bottom,
        left,
        right,
        top
      }: {
        bottom?: number;
        left?: number;
        right?: number;
        top?: number;
      }) => {
        dispatch(
          setPosition({
            application,
            position: {
              bottom:
                bottom !== undefined ? bottom : application.position.bottom,
              left: left !== undefined ? left : application.position.left,
              right: right !== undefined ? right : application.position.right,
              top: top !== undefined ? top : application.position.top
            }
          })
        );
      };

      const restrictedPosition = {
        top: () => {
          const top = position.top();
          if (application.maxDimensions.height && top < limit.min.top()) {
            return limit.min.top();
          }
          if (application.minDimensions.height && top > limit.max.top()) {
            return limit.max.top();
          }
          if (top < 0) {
            return 0;
          }
          return top;
        },
        left: () => {
          const left = position.left();
          if (application.maxDimensions.width && left < limit.min.left()) {
            return limit.min.left();
          }
          if (application.minDimensions.width && left > limit.max.left()) {
            return limit.max.left();
          }
          return left;
        },
        bottom: () => {
          let bottom = position.bottom();
          if (application.maxDimensions.height && bottom < limit.min.bottom()) {
            return limit.min.bottom();
          }
          if (application.minDimensions.height && bottom > limit.max.bottom()) {
            return limit.max.bottom();
          }
          return bottom;
        },
        right: () => {
          let right = position.right();
          if (application.maxDimensions.width && right < limit.min.right()) {
            return limit.min.right();
          }
          if (application.minDimensions.width && right > limit.max.right()) {
            return limit.max.right();
          }
          return right;
        }
      };

      switch (application.resizeMode) {
        case EResize.top: {
          return dispatchPosition({ top: restrictedPosition.top() });
        }
        case EResize.left: {
          return dispatchPosition({ left: restrictedPosition.left() });
        }
        case EResize.bottom: {
          return dispatchPosition({ bottom: restrictedPosition.bottom() });
        }
        case EResize.right: {
          return dispatchPosition({ right: restrictedPosition.right() });
        }
        case EResize.topLeft: {
          return dispatchPosition({
            top: restrictedPosition.top(),
            left: restrictedPosition.left()
          });
        }
        case EResize.topRight: {
          return dispatchPosition({
            top: restrictedPosition.top(),
            right: restrictedPosition.right()
          });
        }
        case EResize.bottomLeft: {
          return dispatchPosition({
            bottom: restrictedPosition.bottom(),
            left: restrictedPosition.left()
          });
        }
        case EResize.bottomRight: {
          return dispatchPosition({
            bottom: restrictedPosition.bottom(),
            right: restrictedPosition.right()
          });
        }
        default:
          break;
      }
    },
    [application, windowRef, dispatch]
  );

  const handleResizerDragMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      const window = windowRef.current;

      if (!window) return;

      const windowBC = window.getBoundingClientRect();

      dispatch(
        setDimensions({
          application,
          dimensions: {
            height: windowBC.height,
            width: windowBC.width
          }
        })
      );

      dispatch(setResizing({ application, resizing: false }));
    },
    [application, dispatch, windowRef]
  );

  useEffect(() => {
    if (application.resizing) {
      const cursor = new Map<EResize, string>([
        [EResize.top, "ns-resize"],
        [EResize.bottom, "ns-resize"],
        [EResize.left, "ew-resize"],
        [EResize.right, "ew-resize"],
        [EResize.topLeft, "nwse-resize"],
        [EResize.topRight, "nesw-resize"],
        [EResize.bottomLeft, "nesw-resize"],
        [EResize.bottomRight, "nwse-resize"]
      ]);

      document.body.style.cursor = cursor.get(application.resizeMode) || "";
      document.addEventListener("mousemove", handleResizerDragMouseMove);
      document.addEventListener("mouseup", handleResizerDragMouseUp);
      return () => {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", handleResizerDragMouseMove);
        document.removeEventListener("mouseup", handleResizerDragMouseUp);
      };
    }
  }, [
    application.resizing,
    application.resizeMode,
    handleResizerDragMouseMove,
    handleResizerDragMouseUp
  ]);

  const resizerClasses: string[] = [styles["window-resizer"]];
  const cursor = new Map<EResize, string>([
    [EResize.top, "resize-top"],
    [EResize.bottom, "resize-bottom"],
    [EResize.left, "resize-left"],
    [EResize.right, "resize-right"],
    [EResize.topLeft, "resize-top-left"],
    [EResize.topRight, "resize-top-right"],
    [EResize.bottomLeft, "resize-bottom-left"],
    [EResize.bottomRight, "resize-bottom-right"]
  ]);
  resizerClasses.push(styles[cursor.get(application.resizeMode) ?? ""]);
  return (
    <div
      className={resizerClasses.join(" ")}
      ref={resizerRef}
      onMouseMove={handleResizerMouseMove}
      onMouseDown={handleResizerDragMouseDown}
      style={{
        pointerEvents: application.dragging ? "none" : "all"
      }}
    ></div>
  );
};

const isEqual = (prevProps: IProps, nextProps: IProps) => {
  if (prevProps.application.resizable !== nextProps.application.resizable) {
    return false;
  }
  if (
    prevProps.application.position.bottom !==
    nextProps.application.position.bottom
  ) {
    return false;
  }
  if (
    prevProps.application.position.left !== nextProps.application.position.left
  ) {
    return false;
  }
  if (
    prevProps.application.position.right !==
    nextProps.application.position.right
  ) {
    return false;
  }
  if (
    prevProps.application.position.top !== nextProps.application.position.top
  ) {
    return false;
  }
  if (prevProps.application.resizable !== nextProps.application.resizable) {
    return false;
  }
  if (prevProps.application.resizeMode !== nextProps.application.resizeMode) {
    return false;
  }
  if (prevProps.application.resizing !== nextProps.application.resizing) {
    return false;
  }
  if (prevProps.application.dragging !== nextProps.application.dragging) {
    return false;
  }
  if (prevProps.windowRef !== nextProps.windowRef) {
    return false;
  }
  if (prevProps.width !== nextProps.width) {
    return false;
  }
  return true;
};

export default memo(WindowResizer, isEqual);
