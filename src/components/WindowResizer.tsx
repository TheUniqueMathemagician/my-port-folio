import React, {
  FunctionComponent,
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
import EResize from "../types/EResize";
import ESnap from "../types/ESnap";

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
        bottom: windowFrameBC.height - e.pageY - windowFrameBC.top,
        left: e.pageX - windowFrameBC.left,
        right: windowFrameBC.width - e.pageX - windowFrameBC.left,
        top: e.pageY - windowFrameBC.top
      };

      const limits = {
        bottom:
          windowFrameBC.height -
          windowFrameBC.top -
          windowBC.top -
          (application.minDimensions.height ?? 0),
        left:
          windowBC.right -
          windowFrameBC.left -
          (application.minDimensions.width ?? 0),
        right:
          windowFrameBC.width -
          windowFrameBC.left -
          windowBC.left -
          (application.minDimensions.width ?? 0),
        top:
          windowBC.bottom -
          windowFrameBC.top -
          (application.minDimensions.height ?? 0)
      };

      const willOverflow = {
        bottom: position.bottom > limits.bottom,
        left: position.left > limits.left,
        right: position.right > limits.right,
        top: position.top > limits.top
      };

      switch (application.resizeMode) {
        case EResize.top:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: application.position.bottom,
                left: application.position.left,
                right: application.position.right,
                top:
                  position.top < 0
                    ? 0
                    : willOverflow.top
                    ? limits.top
                    : position.top
              }
            })
          );
          break;
        case EResize.bottom:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: willOverflow.bottom ? limits.bottom : position.bottom,
                left: application.position.left,
                right: application.position.right,
                top: application.position.top
              }
            })
          );
          break;
        case EResize.left:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: application.position.bottom,
                left: willOverflow.left ? limits.left : position.left,
                right: application.position.right,
                top: application.position.top
              }
            })
          );
          break;
        case EResize.right:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: application.position.bottom,
                left: application.position.left,
                right: willOverflow.right ? limits.right : position.right,
                top: application.position.top
              }
            })
          );
          break;
        case EResize.topLeft:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: application.position.bottom,
                left: willOverflow.left ? limits.left : position.left,
                right: application.position.right,
                top: willOverflow.top ? limits.top : position.top
              }
            })
          );
          break;
        case EResize.topRight:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: application.position.bottom,
                left: application.position.left,
                right: willOverflow.right ? limits.right : position.right,
                top: willOverflow.top ? limits.top : position.top
              }
            })
          );
          break;
        case EResize.bottomLeft:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: willOverflow.bottom ? limits.bottom : position.bottom,
                left: willOverflow.left ? limits.left : position.left,
                right: application.position.right,
                top: application.position.top
              }
            })
          );
          break;
        case EResize.bottomRight:
          dispatch(
            setPosition({
              application,
              position: {
                bottom: willOverflow.bottom ? limits.bottom : position.bottom,
                left: application.position.left,
                right: willOverflow.right ? limits.right : position.right,
                top: application.position.top
              }
            })
          );
          break;
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

export default WindowResizer;
