import classes from "./WindowHeader.module.scss";
import React, {
  FunctionComponent,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { useDispatch, useSelector } from "../hooks/Store";
import {
  WindowInstance,
  closeApplication,
  setDragging,
  setMaximized,
  setMinimized,
  setPosition,
  sendToFront,
  setSnapShadowPosition,
  setSnapShadowVisibility
} from "../store/reducers/Instances";
import { ESnap } from "../types/ESnap";
import { IBoundaries } from "../types/IBoundaries";
import { IOffset } from "../types/IOffset";
import { EColorScheme } from "../types/EColorScheme";

interface IProps {
  pid: string;
  boundaries: IBoundaries;
  windowRef: RefObject<HTMLDivElement>;
}

const WindowHeader: FunctionComponent<IProps> = (props) => {
  const { pid, boundaries, windowRef } = props;

  const headerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );
  const snapShadowVisible = useSelector(
    (store) => store.instances.snapShadow.visible
  );
  const maximized = useSelector(
    (store) => (store.instances.elements[pid] as WindowInstance).maximized
  );
  const dimensions = useSelector(
    (store) => (store.instances.elements[pid] as WindowInstance).dimensions
  );
  const position = useSelector(
    (store) => (store.instances.elements[pid] as WindowInstance).position
  );
  const dragging = useSelector(
    (store) => (store.instances.elements[pid] as WindowInstance).dragging
  );
  const displayName = useSelector(
    (store) => (store.instances.elements[pid] as WindowInstance).displayName
  );

  const [offset, setOffset] = useState<IOffset>({ x: 0, y: 0 });
  const [snap, setSnap] = useState<ESnap>(ESnap.none);

  //#region button handlers

  const handleDragDoubleClick = useCallback(() => {
    dispatch(setMaximized({ pid, maximized: ESnap.top }));
  }, [pid, dispatch]);

  const handleRedClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(closeApplication(pid));
    },
    [dispatch, pid]
  );

  const handleOrangeClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(sendToFront(pid));
      if (maximized) {
        dispatch(setMaximized({ pid, maximized: ESnap.none }));
      } else {
        dispatch(setMaximized({ pid, maximized: ESnap.top }));
      }
    },
    [maximized, dispatch, pid]
  );

  const handleGreenClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(setMinimized({ pid, minimized: true }));
    },
    [pid, dispatch]
  );

  const handleButtonMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  //#endregion

  //#region dragging handlers

  const handleDragMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();

      if (maximized) {
        const header = headerRef.current;
        if (header) {
          let x = (dimensions.width || 0) / 2;
          let y = header.clientHeight / 2;
          setOffset({ x, y });
        }
      } else {
        const window = windowRef.current;
        if (window) {
          const windowBC = window.getBoundingClientRect();
          let x = e.pageX - windowBC.left;
          let y = e.pageY - windowBC.top;
          setOffset({ x, y });
        }
      }

      dispatch(setDragging({ pid, dragging: true }));
    },
    [dispatch, pid, windowRef, dimensions.width, maximized]
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
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: "50%",
            top: 0,
            left: 0,
            right: "50%"
          })
        );
        setSnap(ESnap.topLeft);
      } else if (shouldSnapToTop && shouldSnapToRight) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: "50%",
            top: 0,
            left: "50%",
            right: 0
          })
        );
        setSnap(ESnap.topRight);
      } else if (shouldSnapToBottom && shouldSnapToLeft) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: 0,
            top: "50%",
            left: 0,
            right: "50%"
          })
        );
        setSnap(ESnap.bottomLeft);
      } else if (shouldSnapToBottom && shouldSnapToRight) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: 0,
            top: "50%",
            left: "50%",
            right: 0
          })
        );
        setSnap(ESnap.bottomRight);
      } else if (shouldSnapToTop) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
          })
        );
        setSnap(ESnap.top);
      } else if (shouldSnapToLeft) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: 0,
            top: 0,
            left: 0,
            right: "50%"
          })
        );
        setSnap(ESnap.left);
      } else if (shouldSnapToRight) {
        dispatch(setSnapShadowVisibility(true));
        dispatch(
          setSnapShadowPosition({
            bottom: 0,
            top: 0,
            left: "50%",
            right: 0
          })
        );
        setSnap(ESnap.right);
      } else if (shouldSnapToBottom) {
      } else {
        if (snapShadowVisible) {
          dispatch(setSnapShadowVisibility(false));
        }
        if (maximized) {
          dispatch(setMaximized({ pid, maximized: ESnap.none }));
        }
        setSnap(ESnap.none);
      }

      const tmpPosition = {
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
        right: position.right,
        bottom: position.bottom
      };

      dispatch(setPosition({ pid, position: tmpPosition }));

      if (!snapShadowVisible) {
        const window = windowRef.current;
        if (window) {
          const windowBC = window.getBoundingClientRect();
          const snapShadowPosition = {
            bottom:
              boundaries.y2 - boundaries.y1 - windowBC.top - windowBC.height,
            left: windowBC.left,
            right:
              boundaries.x2 - boundaries.x1 - windowBC.left - windowBC.width,
            top: windowBC.top
          };

          dispatch(setSnapShadowPosition(snapShadowPosition));
        }
      }
    },
    [
      dispatch,
      position,
      boundaries,
      offset,
      snapShadowVisible,
      windowRef,
      maximized,
      pid
    ]
  );

  const handleDragMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(setDragging({ pid, dragging: false }));
      dispatch(setSnapShadowVisibility(false));
      dispatch(setMaximized({ pid, maximized: snap }));
    },
    [pid, dispatch, snap]
  );

  //#endregion

  useEffect(() => {
    if (dragging) {
      document.body.style.cursor = "grabbing";
      document.addEventListener("mousemove", handleDragMouseMove);
      document.addEventListener("mouseup", handleDragMouseUp);
      return () => {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", handleDragMouseMove);
        document.removeEventListener("mouseup", handleDragMouseUp);
      };
    }
  }, [dragging, handleDragMouseMove, handleDragMouseUp]);

  const rootClasses = [classes["root"]];

  if (contrast) rootClasses.push(classes["contrast"]);

  return (
    <div
      className={rootClasses.join(" ")}
      style={{
        cursor: dragging ? "grabbing" : "grab"
      }}
      ref={headerRef}
      onMouseDown={handleDragMouseDown}
      onDoubleClick={handleDragDoubleClick}
      draggable={false}
    >
      <div className={classes["button-list"]}>
        <button
          className={classes["red"]}
          style={{
            pointerEvents: dragging ? "none" : "all"
          }}
          onClick={handleRedClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
        <button
          className={classes["orange"]}
          style={{
            pointerEvents: dragging ? "none" : "all"
          }}
          onClick={handleOrangeClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
        <button
          className={classes["green"]}
          style={{
            pointerEvents: dragging ? "none" : "all"
          }}
          onClick={handleGreenClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
      </div>
      <div className={classes["title"]}>{displayName}</div>
    </div>
  );
};

export default memo(WindowHeader);
