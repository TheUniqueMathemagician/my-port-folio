import React, {
  FunctionComponent,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";

import { useDispatch, useSelector } from "../hooks/Store";
import {
  setDimensions,
  setMaximized,
  setPosition,
  setResizeMode,
  setResizing
} from "../store/slices/Applications";
import { WindowInstance } from "../store/slices/Applications/Types";

import { EResize } from "../types/EResize";
import { ESnap } from "../types/ESnap";

import styles from "./WindowResizer.module.scss";

interface IProps {
  pid: string;
  windowRef: RefObject<HTMLDivElement>;
  width: number;
}

const WindowResizer: FunctionComponent<IProps> = (props) => {
  const { pid, width, windowRef } = props;

  const cursor = useMemo(
    () =>
      new Map<EResize, string>([
        [EResize.top, "ns-resize"],
        [EResize.bottom, "ns-resize"],
        [EResize.left, "ew-resize"],
        [EResize.right, "ew-resize"],
        [EResize.topLeft, "nwse-resize"],
        [EResize.topRight, "nesw-resize"],
        [EResize.bottomLeft, "nesw-resize"],
        [EResize.bottomRight, "nwse-resize"]
      ]),
    []
  );
  const csscursor = useMemo(
    () =>
      new Map<EResize, string>([
        [EResize.top, "resize-top"],
        [EResize.bottom, "resize-bottom"],
        [EResize.left, "resize-left"],
        [EResize.right, "resize-right"],
        [EResize.topLeft, "resize-top-left"],
        [EResize.topRight, "resize-top-right"],
        [EResize.bottomLeft, "resize-bottom-left"],
        [EResize.bottomRight, "resize-bottom-right"]
      ]),
    []
  );

  const resizerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const resizable = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).resizable;
  const resizing = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).resizing;
  const resizeMode = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).resizeMode;
  const position = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).position;
  const maxDimensions = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).maxDimensions;
  const minDimensions = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).minDimensions;

  const handleResizerMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (resizing || !resizable) return;

      const resizer = resizerRef.current;
      const window = windowRef.current;

      if (!resizer || !window) return;

      const [x1, x2, y1, y2] = [
        window.offsetLeft,
        window.offsetLeft + window.offsetWidth,
        window.offsetTop,
        window.offsetTop + window.offsetHeight
      ];

      if (e.pageX >= x2 - width && e.pageY >= y2 - width) {
        if (resizeMode !== EResize.bottomRight) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.bottomRight }));
        }
      } else if (e.pageY >= y2 - width && e.pageX <= x1 + width) {
        if (resizeMode !== EResize.bottomLeft) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.bottomLeft }));
        }
      } else if (e.pageX >= x2 - width && e.pageY <= y1 + width) {
        if (resizeMode !== EResize.topRight) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.topRight }));
        }
      } else if (e.pageY <= y1 + width && e.pageX <= x1 + width) {
        if (resizeMode !== EResize.topLeft) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.topLeft }));
        }
      } else if (e.pageX >= x2 - width) {
        if (resizeMode !== EResize.right) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.right }));
        }
      } else if (e.pageY >= y2 - width) {
        if (resizeMode !== EResize.bottom) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.bottom }));
        }
      } else if (e.pageY <= y1 + width) {
        if (resizeMode !== EResize.top) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.top }));
        }
      } else if (e.pageX <= x1 + width) {
        if (resizeMode !== EResize.left) {
          dispatch(setResizeMode({ pid, resizeMode: EResize.left }));
        }
      } else {
        dispatch(setResizeMode({ pid, resizeMode: EResize.none }));
      }
    },
    [
      pid,
      dispatch,
      width,
      windowRef,
      resizeMode,
      resizing,
      resizable,
      resizerRef
    ]
  );

  const handleResizerDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0 || !resizable) return;
      e.stopPropagation();
      e.preventDefault();

      document.body.style.cursor = cursor.get(resizeMode) || "";

      const window = windowRef.current;
      if (!window) return;
      const windowFrame = window.offsetParent as HTMLDivElement;
      if (!windowFrame) return;

      dispatch(setMaximized({ pid, maximized: ESnap.none }));
      dispatch(setResizing({ pid, resizing: true }));
      dispatch(
        setPosition({
          pid,
          position: {
            bottom:
              windowFrame.offsetHeight - window.offsetTop - window.offsetHeight,
            left: window.offsetLeft,
            right:
              windowFrame.offsetWidth - window.offsetLeft - window.offsetWidth,
            top: window.offsetTop
          }
        })
      );
    },
    [dispatch, windowRef, pid, resizable, resizeMode, cursor]
  );

  const handleResizerDragMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const window = windowRef.current;
      if (!window) return;
      const windowFrame = window.offsetParent as HTMLDivElement;
      if (!windowFrame) return;

      //TODO: e.offsetY e.offsetX
      const tmpPosition = {
        bottom: () => windowFrame.offsetHeight - e.pageY,
        left: () => e.pageX - windowFrame.offsetLeft,
        right: () => windowFrame.offsetWidth - e.pageX - windowFrame.offsetLeft,
        top: () => e.pageY - windowFrame.offsetTop
      };

      const limit = {
        min: {
          bottom: () =>
            windowFrame.offsetHeight -
            window.offsetTop -
            (maxDimensions.height ?? 0),
          left: () =>
            window.offsetLeft + window.offsetWidth - (maxDimensions.width ?? 0),
          right: () =>
            windowFrame.offsetWidth -
            window.offsetLeft -
            (maxDimensions.width ?? 0),
          top: () =>
            window.offsetTop + window.offsetHeight - (maxDimensions.height ?? 0)
        },
        max: {
          bottom: () =>
            windowFrame.offsetHeight -
            window.offsetTop -
            (minDimensions.height ?? 0),
          left: () =>
            window.offsetLeft + window.offsetWidth - (minDimensions.width ?? 0),
          right: () =>
            windowFrame.offsetWidth -
            window.offsetLeft -
            (minDimensions.width ?? 0),
          top: () =>
            window.offsetTop + window.offsetHeight - (minDimensions.height ?? 0)
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
            pid,
            position: {
              bottom: bottom !== undefined ? bottom : position.bottom,
              left: left !== undefined ? left : position.left,
              right: right !== undefined ? right : position.right,
              top: top !== undefined ? top : position.top
            }
          })
        );
      };

      const restrictedPosition = {
        top: () => {
          const top = tmpPosition.top();
          if (maxDimensions.height && top < limit.min.top()) {
            return limit.min.top();
          }
          if (minDimensions.height && top > limit.max.top()) {
            return limit.max.top();
          }
          if (top < 0) {
            return 0;
          }
          return top;
        },
        left: () => {
          const left = tmpPosition.left();
          if (maxDimensions.width && left < limit.min.left()) {
            return limit.min.left();
          }
          if (minDimensions.width && left > limit.max.left()) {
            return limit.max.left();
          }
          return left;
        },
        bottom: () => {
          let bottom = tmpPosition.bottom();
          if (maxDimensions.height && bottom < limit.min.bottom()) {
            return limit.min.bottom();
          }
          if (minDimensions.height && bottom > limit.max.bottom()) {
            return limit.max.bottom();
          }
          return bottom;
        },
        right: () => {
          let right = tmpPosition.right();
          if (maxDimensions.width && right < limit.min.right()) {
            return limit.min.right();
          }
          if (minDimensions.width && right > limit.max.right()) {
            return limit.max.right();
          }
          return right;
        }
      };

      switch (resizeMode) {
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
    [
      pid,
      windowRef,
      dispatch,
      minDimensions,
      maxDimensions,
      resizeMode,
      position
    ]
  );

  const handleResizerDragMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      document.body.style.cursor = "";

      const window = windowRef.current;

      if (!window) return;

      dispatch(
        setDimensions({
          pid,
          dimensions: {
            height: window.offsetHeight,
            width: window.offsetWidth
          }
        })
      );
      dispatch(setResizing({ pid, resizing: false }));
    },
    [dispatch, windowRef, pid]
  );

  useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleResizerDragMouseMove);
      document.addEventListener("mouseup", handleResizerDragMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleResizerDragMouseMove);
        document.removeEventListener("mouseup", handleResizerDragMouseUp);
      };
    }
  }, [
    resizing,
    resizeMode,
    handleResizerDragMouseMove,
    handleResizerDragMouseUp
  ]);

  const resizerClasses: string[] = [styles["window-resizer"]];

  resizerClasses.push(styles[csscursor.get(resizeMode) ?? ""]);
  return (
    <div
      className={resizerClasses.join(" ")}
      ref={resizerRef}
      onMouseMove={handleResizerMouseMove}
      onMouseDown={handleResizerDragMouseDown}
    ></div>
  );
};

export default memo(WindowResizer);
