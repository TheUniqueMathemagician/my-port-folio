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
  application: WindowInstance;
  boundaries: IBoundaries;
  windowRef: RefObject<HTMLDivElement>;
}

const WindowHeader: FunctionComponent<IProps> = ({
  application,
  boundaries,
  windowRef
}) => {
  const headerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const [offset, setOffset] = useState<IOffset>({ x: 0, y: 0 });

  const [snap, setSnap] = useState<ESnap>(ESnap.none);

  const snapShadowVisible = useSelector(
    (store) => store.instances.snapShadow.visible
  );

  //#region button handlers

  const handleDragDoubleClick = useCallback(() => {
    dispatch(setMaximized({ application, maximized: ESnap.top }));
  }, [application, dispatch]);

  const handleRedClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(closeApplication(application));
    },
    [dispatch, application]
  );

  const handleOrangeClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(sendToFront(application));
      if (application.maximized) {
        dispatch(setMaximized({ application, maximized: ESnap.none }));
      } else {
        dispatch(setMaximized({ application, maximized: ESnap.top }));
      }
    },
    [application, dispatch]
  );

  const handleGreenClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(setMinimized({ application, minimized: true }));
    },
    [application, dispatch]
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

      if (application.maximized) {
        const header = headerRef.current;
        if (header) {
          let x = (application.dimensions.width || 0) / 2;
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

      dispatch(setDragging({ application, dragging: true }));
    },
    [dispatch, application, windowRef]
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
        if (application.maximized) {
          dispatch(setMaximized({ application, maximized: ESnap.none }));
        }
        setSnap(ESnap.none);
      }

      const position = {
        left: e.pageX - offset.x,
        top: e.pageY - offset.y,
        right: application.position.right,
        bottom: application.position.bottom
      };

      dispatch(setPosition({ application, position }));

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
    [dispatch, application, boundaries, offset, snapShadowVisible, windowRef]
  );

  const handleDragMouseUp = useCallback(
    (e: globalThis.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(setDragging({ application, dragging: false }));
      dispatch(setSnapShadowVisibility(false));
      dispatch(setMaximized({ application, maximized: snap }));
    },
    [application, dispatch, snap]
  );

  //#endregion

  useEffect(() => {
    if (application.dragging) {
      document.body.style.cursor = "grabbing";
      document.addEventListener("mousemove", handleDragMouseMove);
      document.addEventListener("mouseup", handleDragMouseUp);
      return () => {
        document.body.style.cursor = "";
        document.removeEventListener("mousemove", handleDragMouseMove);
        document.removeEventListener("mouseup", handleDragMouseUp);
      };
    }
  }, [application.dragging, handleDragMouseMove, handleDragMouseUp]);

  const rootClasses = [classes["root"]];

  if (contrast) rootClasses.push(classes["contrast"]);

  return (
    <div
      className={rootClasses.join(" ")}
      style={{
        cursor: application.dragging ? "grabbing" : "grab"
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
            pointerEvents: application.dragging ? "none" : "all"
          }}
          onClick={handleRedClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
        <button
          className={classes["orange"]}
          style={{
            pointerEvents: application.dragging ? "none" : "all"
          }}
          onClick={handleOrangeClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
        <button
          className={classes["green"]}
          style={{
            pointerEvents: application.dragging ? "none" : "all"
          }}
          onClick={handleGreenClick}
          onMouseDown={handleButtonMouseDown}
        ></button>
      </div>
      <div className={classes["title"]}>{application.displayName}</div>
    </div>
  );
};

const isEqual = (prevProps: IProps, nextProps: IProps) => {
  if (
    prevProps.application.resizable !== nextProps.application.resizable ||
    prevProps.application.position.bottom !==
      nextProps.application.position.bottom ||
    prevProps.application.position.left !==
      nextProps.application.position.left ||
    prevProps.application.position.right !==
      nextProps.application.position.right ||
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
  if (prevProps.application.displayName !== nextProps.application.displayName) {
    return false;
  }
  if (prevProps.windowRef !== nextProps.windowRef) {
    return false;
  }
  if (
    prevProps.boundaries.x1 !== nextProps.boundaries.x1 ||
    prevProps.boundaries.x2 !== nextProps.boundaries.x2 ||
    prevProps.boundaries.y1 !== nextProps.boundaries.y1 ||
    prevProps.boundaries.y1 !== nextProps.boundaries.y2
  ) {
    return false;
  }
  return true;
};

export default memo(WindowHeader, isEqual);
