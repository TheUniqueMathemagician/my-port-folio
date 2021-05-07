import React, {
  createElement,
  FunctionComponent,
  memo,
  useCallback,
  useRef
} from "react";
import classes from "./Window.module.scss";
import { WindowInstance } from "../store/reducers/Instances";
import { IPosition } from "../types/IPosition";
import { IBoundaries } from "../types/IBoundaries";
import { applicationsMap } from "../store/reducers/Applications";
import { sendToFront } from "../store/reducers/Instances";
import { useDispatch, useSelector } from "../hooks/Store";
import WindowHeader from "./WindowHeader";
import WindowResizer from "./WindowResizer";
import { EColorScheme } from "../types/EColorScheme";

interface IProps {
  application: WindowInstance;
  boundaries: IBoundaries;
  borderOffset: number;
  resizerWidth: number;
}

const Window: FunctionComponent<IProps> = ({
  application,
  boundaries,
  borderOffset,
  resizerWidth
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  const zIndexes = useSelector((store) => store.instances.zIndexes);
  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const dispatch = useDispatch();

  const handleWindowMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      if (
        zIndexes.findIndex((id) => id === application.id) !==
        zIndexes.length - 1
      ) {
        dispatch(sendToFront(application));
      }
    },
    [dispatch, application, zIndexes]
  );

  const handleWindowFocus = useCallback(
    (e: React.FocusEvent<HTMLElement>) => {
      if (
        zIndexes.findIndex((id) => id === application.id) !==
        zIndexes.length - 1
      ) {
        dispatch(sendToFront(application));
      }
    },
    [dispatch, application, zIndexes]
  );

  //#region window rendering checks

  const rootClasses = [classes["root"]];
  const backgroundClasses = [classes["background"]];

  let width: number | "" = "";
  let height: number | "" = "";
  let position: IPosition = {
    bottom: null,
    left: null,
    right: null,
    top: null
  };

  const checkBoundaries = () => {
    if (application.position.left) {
      if (
        application.position.left <
        boundaries.x1 - (application.dimensions.width ?? 0) + borderOffset
      ) {
        position.left =
          boundaries.x1 - (application.dimensions.width ?? 0) + borderOffset;
      }
      if (application.position.left > boundaries.x2 - borderOffset) {
        position.left = boundaries.x2 - borderOffset;
      }
    }
    if (application.position.top) {
      if (application.position.top < boundaries.y1) {
        position.top = boundaries.y1;
      }
      if (application.position.top > boundaries.y2 - borderOffset) {
        position.top = boundaries.y2 - borderOffset;
      }
    }
  };

  if (application.maximized) {
    rootClasses.push(classes[`snap-${application.maximized}`]);
  } else if (application.resizing) {
    position.top = application.position.top;
    position.left = application.position.left;
    position.right = application.position.right;
    position.bottom = application.position.bottom;
    checkBoundaries();
  } else if (
    application.position.bottom === null &&
    application.position.left === null &&
    application.position.right === null &&
    application.position.top === null
  ) {
    position.left =
      (boundaries.x2 - boundaries.x1 - (application.dimensions.width ?? 0)) / 2;
    position.top =
      (boundaries.y2 - boundaries.y1 - (application.dimensions.height ?? 0)) /
      2;
    width = application.dimensions.width ?? 0;
    height = application.dimensions.height ?? 0;
    checkBoundaries();
  } else {
    position.top = application.position.top;
    position.left = application.position.left;
    width = application.dimensions.width ?? 0;
    height = application.dimensions.height ?? 0;
    checkBoundaries();
  }

  //#endregion

  const component = applicationsMap.get(application.component) || null;

  const zIndex = zIndexes.indexOf(application.id);

  if (contrast) rootClasses.push(classes["contrast"]);

  return (
    <section
      onFocus={handleWindowFocus}
      className={rootClasses.join(" ")}
      style={{
        zIndex,
        top: position.top ?? "",
        left: position.left ?? "",
        bottom: position.bottom ?? "",
        right: position.right ?? "",
        height: height,
        width: width,
        opacity: application.dragging ? "0.7" : "",
        visibility: application.minimized ? "collapse" : "visible"
      }}
      ref={windowRef}
      onDragStart={() => false}
      draggable="false"
      onMouseDown={handleWindowMouseDown}
    >
      <WindowResizer
        application={application}
        windowRef={windowRef}
        width={resizerWidth}
      ></WindowResizer>
      <WindowHeader
        application={application}
        boundaries={boundaries}
        windowRef={windowRef}
      ></WindowHeader>
      <div className={backgroundClasses.join(" ")}>
        {component
          ? createElement(component, {
              args: application.args,
              pid: application.id
            })
          : null}
      </div>
    </section>
  );
};

export default memo(Window);
