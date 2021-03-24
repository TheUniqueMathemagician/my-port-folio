import {
  ElementType,
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import styles from "./Window.module.scss";
import { BoundariesContext } from "./WindowFrame";

interface Props {
  onRed?: (e: MouseEvent) => void;
  onOrange?: (e: MouseEvent) => void;
  onGreen?: (e: MouseEvent) => void;
  sendToFront?: () => void;
  zIndex?: number;
}

enum SnapState {
  none,
  top,
  left,
  right
}

type Position = "" | number | "50%" | "100%";
interface PositionState {
  bottom: Position;
  left: Position;
  right: Position;
  top: Position;
}

interface OffsetState {
  x: number;
  y: number;
}

const Window: ElementType<Props> = ({
  children,
  onRed,
  onOrange,
  onGreen,
  sendToFront,
  zIndex
}) => {
  const [minHeight, setMinHeight] = useState<number>(500);
  const [minWidth, setMinWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(300);
  const [width, setWidth] = useState<number>(500);
  const [snap, setSnap] = useState<SnapState>(SnapState.none);
  const [offset, setOffset] = useState<OffsetState>({ x: 0, y: 0 });
  const [position, setPosition] = useState<PositionState>({
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  });
  const [dragging, setDragging] = useState<boolean>(false);

  const boundariesContext = useContext(BoundariesContext);

  const windowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("reloaded");
  });

  const mainMouseDownHandler = useCallback(() => {
    if (!sendToFront) return;
    sendToFront();
  }, [sendToFront]);
  const mouseDownHandler = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return;
    const card = windowRef.current;
    if (!card) return;
    e.preventDefault();

    setOffset({
      x: e.pageX - (parseInt(card.style.left) ?? 0),
      y: e.pageY - (parseInt(card.style.top) ?? 0)
    });

    setDragging(true);
  }, []);
  const mouseMoveHandler = useCallback(
    (e: globalThis.MouseEvent) => {
      e.preventDefault();

      const header = headerRef.current;
      if (!header) return;

      let _position: PositionState = {
        left: "",
        top: "",
        right: "",
        bottom: ""
      };

      if (!snap) {
        _position.left = e.pageX - offset.x;
        _position.top = e.pageY - offset.y;
        if (_position.left < boundariesContext.x1 - header.clientWidth + 10) {
          _position.left = boundariesContext.x1 - header.clientWidth + 10;
        }
        if (_position.top < boundariesContext.y1) {
          _position.top = boundariesContext.y1;
        }
        if (_position.top > boundariesContext.x2 - 10) {
          _position.top = boundariesContext.x2 - 10;
        }
        if (_position.top > boundariesContext.y2 - header.clientHeight) {
          _position.top = boundariesContext.y2 - header.clientHeight;
        }
      }

      if (e.pageX - 1 <= boundariesContext.x1) {
        setSnap(SnapState.left);
      } else if (e.pageX + 1 >= boundariesContext.x2) {
        setSnap(SnapState.right);
      } else if (e.pageY - 1 <= boundariesContext.y1) {
        setSnap(SnapState.top);
      } else {
        setSnap(SnapState.none);
      }

      setPosition(_position);
    },
    [offset, boundariesContext, headerRef, snap]
  );
  const mouseUpHandler = useCallback((e: globalThis.MouseEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);
  const redActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onRed) {
        onRed(e);
      }
      if (sendToFront) {
        sendToFront();
      }
    },
    [onRed, sendToFront]
  );
  const orangeActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onOrange) {
        onOrange(e);
      }
      if (sendToFront) {
        sendToFront();
      }
    },
    [onOrange, sendToFront]
  );
  const greenActionHandler = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (onGreen) {
        onGreen(e);
      }
      if (sendToFront) {
        sendToFront();
      }
    },
    [onGreen, sendToFront]
  );

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
    if (!header) return;
    if (!snap) {
      const offset: OffsetState = {
        x: header.clientWidth / 2,
        y: header.clientHeight / 2
      };
      setOffset(offset);
    }
  }, [snap]);

  let sectionClasses: string[] = [styles.window];
  switch (snap) {
    case SnapState.left:
      sectionClasses.push(styles["snap-left"]);
      break;
    case SnapState.right:
      sectionClasses.push(styles["snap-right"]);
      break;
    case SnapState.top:
      sectionClasses.push(styles["snap-top"]);
      break;
    default:
      break;
  }

  return (
    <section
      className={sectionClasses.join(" ")}
      style={{
        zIndex,
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        minHeight,
        minWidth
      }}
      ref={windowRef}
      onDragStart={() => false}
      draggable="false"
      onMouseDown={mainMouseDownHandler}
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
      <div className={styles.background}>{children}</div>
    </section>
  );
};

export default Window;
