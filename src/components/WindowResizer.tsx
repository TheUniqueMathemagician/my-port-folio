import { Component, createRef, RefObject } from "react";
import WindowInstance from "../data/classes/WindowInstance";
import EResize from "../types/EResize";
import ESnap from "../types/ESnap";

import styles from "./WindowResizer.module.scss";

interface IProps {
  application: WindowInstance;
  windowRef: RefObject<HTMLDivElement>;
}

interface IState {
  resizing: boolean;
}

export default class WindowResizer extends Component<IProps, IState> {
  private m_resizerWidth = 4;
  private m_resizerRef = createRef<HTMLDivElement>();
  private m_windowRef = createRef<HTMLDivElement>();

  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    this.m_windowRef = props.windowRef;
    this.handleResizerMouseMove = this.handleResizerMouseMove.bind(this);
    this.handleResizerDragMouseDown = this.handleResizerDragMouseDown.bind(
      this
    );
    this.handleResizerDragMouseMove = this.handleResizerDragMouseMove.bind(
      this
    );
    this.handleResizerDragMouseUp = this.handleResizerDragMouseUp.bind(this);
  }

  private handleResizerMouseMove(e: React.MouseEvent) {
    if (this.props.application.resizing) return;
    const resizer = this.m_resizerRef.current;
    const window = this.m_windowRef.current;

    if (!resizer || !window) return;

    const [x1, x2, y1, y2] = [
      window.offsetLeft,
      window.offsetLeft + window.clientWidth,
      window.offsetTop,
      window.offsetTop + window.clientHeight
    ];

    if (
      e.pageX >= x2 - this.m_resizerWidth &&
      e.pageY >= y2 - this.m_resizerWidth
    ) {
      this.props.application.resizeMode = EResize.bottomRight;
    } else if (
      e.pageY >= y2 - this.m_resizerWidth &&
      e.pageX <= x1 + this.m_resizerWidth
    ) {
      this.props.application.resizeMode = EResize.bottomLeft;
    } else if (
      e.pageX >= x2 - this.m_resizerWidth &&
      e.pageY <= y1 + this.m_resizerWidth
    ) {
      this.props.application.resizeMode = EResize.topRight;
    } else if (
      e.pageY <= y1 + this.m_resizerWidth &&
      e.pageX <= x1 + this.m_resizerWidth
    ) {
      this.props.application.resizeMode = EResize.topLeft;
    } else if (e.pageX >= x2 - this.m_resizerWidth) {
      this.props.application.resizeMode = EResize.right;
    } else if (e.pageY >= y2 - this.m_resizerWidth) {
      this.props.application.resizeMode = EResize.bottom;
    } else if (e.pageY <= y1 + this.m_resizerWidth) {
      this.props.application.resizeMode = EResize.top;
    } else if (e.pageX <= x1 + this.m_resizerWidth) {
      this.props.application.resizeMode = EResize.left;
    } else {
      this.props.application.resizeMode = EResize.none;
    }
  }

  private handleResizerDragMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.stopPropagation();
    e.preventDefault();

    const window = this.m_windowRef.current;
    if (!window) return;
    const windowFrame = window.offsetParent;
    if (!windowFrame) return;

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

    document.body.style.cursor =
      cursor.get(this.props.application.resizeMode) || "";
    document.addEventListener("mousemove", this.handleResizerDragMouseMove);
    document.addEventListener("mouseup", this.handleResizerDragMouseUp);

    const windowBC = window.getBoundingClientRect();
    const windowFrameBC = windowFrame.getBoundingClientRect();

    this.props.application.maximized = ESnap.none;
    this.props.application.resizing = true;
    this.props.application.position = {
      bottom: windowFrameBC.height - windowBC.bottom - windowFrameBC.top,
      left: windowBC.left - windowFrameBC.left,
      right: windowFrameBC.width - windowBC.right - windowFrameBC.left,
      top: windowBC.top - windowFrameBC.top
    };
  }

  private handleResizerDragMouseMove(e: globalThis.MouseEvent) {
    const window = this.m_windowRef.current;
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
        this.props.application.minHeight,
      left:
        windowBC.right - windowFrameBC.left - this.props.application.minWidth,
      right:
        windowFrameBC.width -
        windowFrameBC.left -
        windowBC.left -
        this.props.application.minWidth,
      top:
        windowBC.bottom - windowFrameBC.top - this.props.application.minHeight
    };

    const willOverflow = {
      bottom: position.bottom > limits.bottom,
      left: position.left > limits.left,
      right: position.right > limits.right,
      top: position.top > limits.top
    };

    switch (this.props.application.resizeMode) {
      case EResize.top:
        this.props.application.position = {
          bottom: this.props.application.position.bottom,
          left: this.props.application.position.left,
          right: this.props.application.position.right,
          top:
            position.top < 0 ? 0 : willOverflow.top ? limits.top : position.top
        };
        break;
      case EResize.bottom:
        this.props.application.position = {
          bottom: willOverflow.bottom ? limits.bottom : position.bottom,
          left: this.props.application.position.left,
          right: this.props.application.position.right,
          top: this.props.application.position.top
        };
        break;
      case EResize.left:
        this.props.application.position = {
          bottom: this.props.application.position.bottom,
          left: willOverflow.left ? limits.left : position.left,
          right: this.props.application.position.right,
          top: this.props.application.position.top
        };
        break;
      case EResize.right:
        this.props.application.position = {
          bottom: this.props.application.position.bottom,
          left: this.props.application.position.left,
          right: willOverflow.right ? limits.right : position.right,
          top: this.props.application.position.top
        };
        break;
      case EResize.topLeft:
        this.props.application.position = {
          bottom: this.props.application.position.bottom,
          left: willOverflow.left ? limits.left : position.left,
          right: this.props.application.position.right,
          top: willOverflow.top ? limits.top : position.top
        };
        break;
      case EResize.topRight:
        this.props.application.position = {
          bottom: this.props.application.position.bottom,
          left: this.props.application.position.left,
          right: willOverflow.right ? limits.right : position.right,
          top: willOverflow.top ? limits.top : position.top
        };
        break;
      case EResize.bottomLeft:
        this.props.application.position = {
          bottom: willOverflow.bottom ? limits.bottom : position.bottom,
          left: willOverflow.left ? limits.left : position.left,
          right: this.props.application.position.right,
          top: this.props.application.position.top
        };
        break;
      case EResize.bottomRight:
        this.props.application.position = {
          bottom: willOverflow.bottom ? limits.bottom : position.bottom,
          left: this.props.application.position.left,
          right: willOverflow.right ? limits.right : position.right,
          top: this.props.application.position.top
        };
        break;
      default:
        break;
    }
  }

  private handleResizerDragMouseUp(e: globalThis.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    document.body.style.cursor = "";
    document.removeEventListener("mousemove", this.handleResizerDragMouseMove);
    document.removeEventListener("mouseup", this.handleResizerDragMouseUp);

    const window = this.m_windowRef.current;

    if (!window) return;

    const windowBC = window.getBoundingClientRect();

    this.props.application.dimensions = {
      height: windowBC.height,
      width: windowBC.width
    };

    this.props.application.resizing = false;
  }

  render() {
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
    resizerClasses.push(
      styles[cursor.get(this.props.application.resizeMode) ?? ""]
    );
    return (
      <div
        className={resizerClasses.join(" ")}
        ref={this.m_resizerRef}
        onMouseMove={this.handleResizerMouseMove}
        onMouseDown={this.handleResizerDragMouseDown}
        style={{
          pointerEvents: this.props.application.dragging ? "none" : "all"
        }}
      ></div>
    );
  }
}
