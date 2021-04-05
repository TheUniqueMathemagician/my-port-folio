import React, { Component, createElement, createRef } from "react";
import WindowApplication from "../shared/classes/WindowApplication";

import Boundaries from "../shared/Boundaries";
import Snap from "../shared/Snap";
import Resize from "../shared/Resize";
import IOffset from "../shared/IOffset";
import IPosition from "../shared/IPosition";

import styles from "./Window.module.scss";
interface IState {
  snap: Snap;
  offset: IOffset;
  position: IPosition;
  dragging: boolean;
  resizing: boolean;
}
interface IProps {
  application: WindowApplication;
  boundaries: Boundaries;
  borderOffset: number;
  resizerWidth: number;
}

export default class Window extends Component<IProps, IState> {
  private m_windowRef: React.RefObject<HTMLDivElement>;
  private m_resizerRef: React.RefObject<HTMLDivElement>;
  private m_headerRef: React.RefObject<HTMLDivElement>;

  private m_resizerWidth: number = 4;
  private m_borderOffset: number = 16;

  constructor(props: IProps) {
    super(props);

    this.m_windowRef = createRef<HTMLDivElement>();
    this.m_resizerRef = createRef<HTMLDivElement>();
    this.m_headerRef = createRef<HTMLDivElement>();

    const snap: Snap = Snap.none;
    const offset: IOffset = { x: 0, y: 0 };
    const position: IPosition = {
      bottom: "",
      left: "",
      right: "",
      top: ""
    };
    const dragging: boolean = false;
    const resizing: boolean = false;
    this.state = {
      snap,
      offset,
      position,
      dragging,
      resizing
    };

    this.handleWindowMouseDown = this.handleWindowMouseDown.bind(this);
    this.handleDragMouseDown = this.handleDragMouseDown.bind(this);
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
    this.handleDragMouseUp = this.handleDragMouseUp.bind(this);
    this.handleRedClick = this.handleRedClick.bind(this);
    this.handleOrangeClick = this.handleOrangeClick.bind(this);
    this.handleGreenClick = this.handleGreenClick.bind(this);
    this.handleResizerMouseMove = this.handleResizerMouseMove.bind(this);
    this.handleResizerDragMouseDown = this.handleResizerDragMouseDown.bind(
      this
    );
    this.handleResizerDragMouseMove = this.handleResizerDragMouseMove.bind(
      this
    );
    this.handleResizerDragMouseUp = this.handleResizerDragMouseUp.bind(this);
    this.handleDragDoubleClick = this.handleDragDoubleClick.bind(this);
  }

  private handleWindowMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.props.application.sendToFront();
  }

  private handleDragMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();

    const window = this.m_windowRef.current;
    const header = this.m_headerRef.current;
    if (!window || !header) return;

    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", this.handleDragMouseMove);
    document.addEventListener("mouseup", this.handleDragMouseUp);

    if (this.props.application.maximized) {
      this.setState((state) => ({
        ...state,
        dragging: true,
        offset: {
          x: this.props.application.width / 2,
          y: header.clientHeight / 2
        }
      }));
    } else {
      this.setState((state) => ({
        ...state,
        dragging: true,
        offset: {
          x: e.pageX - (parseInt(window.style.left) || 0),
          y: e.pageY - (parseInt(window.style.top) || 0)
        }
      }));
    }
  }

  private handleDragMouseMove(e: globalThis.MouseEvent) {
    const header = this.m_headerRef.current;
    if (!header) return;

    e.stopPropagation();
    e.preventDefault();

    const shouldSnapToTop = e.pageY - 1 <= this.props.boundaries.y1;
    const shouldSnapToBottom = e.pageY + 1 >= this.props.boundaries.y2;
    const shouldSnapToLeft = e.pageX - 1 <= this.props.boundaries.x1;
    const shouldSnapToRight = e.pageX + 1 >= this.props.boundaries.x2;

    if (shouldSnapToTop && shouldSnapToLeft) {
      this.setState((state) => ({
        ...state,
        snap: Snap.topLeft,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToTop && shouldSnapToRight) {
      this.setState((state) => ({
        ...state,
        snap: Snap.topRight,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToBottom && shouldSnapToLeft) {
      this.setState((state) => ({
        ...state,
        snap: Snap.bottomLeft,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToBottom && shouldSnapToRight) {
      this.setState((state) => ({
        ...state,
        snap: Snap.bottomRight,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToTop) {
      this.setState((state) => ({
        ...state,
        snap: Snap.top,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToLeft) {
      this.setState((state) => ({
        ...state,
        snap: Snap.left,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else if (shouldSnapToRight) {
      this.setState((state) => ({
        ...state,
        snap: Snap.right,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
    } else {
      this.setState((state) => ({
        ...state,
        snap: Snap.none,
        // offset: this.props.application.maximized
        //   ? {
        //       x: this.props.application.width,
        //       y: this.props.application.height
        //     }
        //   : state.offset,
        position: {
          left: e.pageX - state.offset.x,
          top: e.pageY - state.offset.y,
          right: "",
          bottom: ""
        }
      }));
      this.props.application.maximized = Snap.none;
    }
  }

  private handleDragMouseUp(e: globalThis.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    document.body.style.cursor = "";
    document.removeEventListener("mousemove", this.handleDragMouseMove);
    document.removeEventListener("mouseup", this.handleDragMouseUp);
    this.setState((state) => ({ ...state, dragging: false }));
    this.props.application.maximized = this.state.snap;
  }

  private handleRedClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.props.application.close();
  }

  private handleOrangeClick(e: React.MouseEvent) {
    e.preventDefault();
    this.props.application.sendToFront();
    if (this.props.application.maximized) {
      this.props.application.maximized = Snap.none;
    } else {
      this.props.application.maximized = Snap.top;
    }
  }

  private handleGreenClick(e: React.MouseEvent) {
    e.preventDefault();
    this.props.application.minimized = true;
    this.props.application.sendToFront();
  }

  private handleResizerMouseMove(e: React.MouseEvent) {
    const resizer = this.m_resizerRef.current;
    const window = this.m_windowRef.current;

    if (!resizer || !window || this.state.resizing) return;

    const [x1, x2, y1, y2] = [
      window.offsetLeft,
      window.offsetLeft + window.clientWidth,
      window.offsetTop,
      window.offsetTop + window.clientHeight
    ];

    if (e.pageX >= x2 - 16 && e.pageY >= y2 - 16) {
      this.props.application.resize = Resize.bottomRight;
    } else if (e.pageY >= y2 - 16 && e.pageX <= x1 + 16) {
      this.props.application.resize = Resize.bottomLeft;
    } else if (e.pageX >= x2 - 16 && e.pageY <= y1 + 16) {
      this.props.application.resize = Resize.topRight;
    } else if (e.pageY <= y1 + 16 && e.pageX <= x1 + 16) {
      this.props.application.resize = Resize.topLeft;
    } else if (e.pageX >= x2 - this.m_resizerWidth) {
      this.props.application.resize = Resize.right;
    } else if (e.pageY >= y2 - this.m_resizerWidth) {
      this.props.application.resize = Resize.bottom;
    } else if (e.pageY <= y1 + this.m_resizerWidth) {
      this.props.application.resize = Resize.top;
    } else if (e.pageX <= x1 + this.m_resizerWidth) {
      this.props.application.resize = Resize.left;
    } else {
      this.props.application.resize = Resize.none;
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

    const cursor = new Map<Resize, string>([
      [Resize.top, "ns-resize"],
      [Resize.bottom, "ns-resize"],
      [Resize.left, "ew-resize"],
      [Resize.right, "ew-resize"],
      [Resize.topLeft, "nwse-resize"],
      [Resize.topRight, "nesw-resize"],
      [Resize.bottomLeft, "nesw-resize"],
      [Resize.bottomRight, "nwse-resize"]
    ]);

    document.body.style.cursor =
      cursor.get(this.props.application.resize) || "";
    document.addEventListener("mousemove", this.handleResizerDragMouseMove);
    document.addEventListener("mouseup", this.handleResizerDragMouseUp);

    const windowBC = window.getBoundingClientRect();
    const windowFrameBC = windowFrame.getBoundingClientRect();

    this.props.application.maximized = Snap.none;

    this.setState((state) => ({
      ...state,
      resizing: true,
      snap: Snap.none,
      position: {
        bottom: windowFrameBC.height - windowBC.bottom - windowFrameBC.top,
        left: windowBC.left - windowFrameBC.left,
        right: windowFrameBC.width - windowBC.right - windowFrameBC.left,
        top: windowBC.top - windowFrameBC.top
      }
    }));
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

    switch (this.props.application.resize) {
      case Resize.top:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: state.position.bottom,
            left: state.position.left,
            right: state.position.right,
            top:
              position.top < 0
                ? 0
                : willOverflow.top
                ? limits.top
                : position.top
          }
        }));
        break;
      case Resize.bottom:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: willOverflow.bottom ? limits.bottom : position.bottom,
            left: state.position.left,
            right: state.position.right,
            top: state.position.top
          }
        }));
        break;
      case Resize.left:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: state.position.bottom,
            left: willOverflow.left ? limits.left : position.left,
            right: state.position.right,
            top: state.position.top
          }
        }));
        break;
      case Resize.right:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: state.position.bottom,
            left: state.position.left,
            right: willOverflow.right ? limits.right : position.right,
            top: state.position.top
          }
        }));
        break;
      case Resize.topLeft:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: state.position.bottom,
            left: willOverflow.left ? limits.left : position.left,
            right: state.position.right,
            top: willOverflow.top ? limits.top : position.top
          }
        }));
        break;
      case Resize.topRight:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: state.position.bottom,
            left: state.position.left,
            right: willOverflow.right ? limits.right : position.right,
            top: willOverflow.top ? limits.top : position.top
          }
        }));
        break;
      case Resize.bottomLeft:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: willOverflow.bottom ? limits.bottom : position.bottom,
            left: willOverflow.left ? limits.left : position.left,
            right: state.position.right,
            top: state.position.top
          }
        }));
        break;
      case Resize.bottomRight:
        this.setState((state) => ({
          ...state,
          position: {
            bottom: willOverflow.bottom ? limits.bottom : position.bottom,
            left: state.position.left,
            right: willOverflow.right ? limits.right : position.right,
            top: state.position.top
          }
        }));
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

    this.setState((state) => ({
      ...state,
      resizing: false,
      position: {
        bottom: "",
        left: state.position.left,
        right: "",
        top: state.position.top
      }
    }));
  }

  private handleDragDoubleClick() {
    this.props.application.maximized = Snap.top;
  }

  public render() {
    let windowClasses: string[] = [styles["window"]];
    let windowShadowClasses: string[] = [styles["window-shadow"]];
    let width: number | "" = "";
    let height: number | "" = "";
    let position: IPosition = { bottom: "", left: "", right: "", top: "" };

    if (this.state.resizing) {
      position.top = this.state.position.top;
      position.left = this.state.position.left;
      position.right = this.state.position.right;
      position.bottom = this.state.position.bottom;
    } else {
      if (this.props.application.maximized) {
        windowClasses.push(styles[`snap-${this.props.application.maximized}`]);
      } else {
        if (this.state.snap) {
          windowShadowClasses.push(styles[`snap-${this.state.snap}`]);
        }
        width = this.props.application.width;
        height = this.props.application.height;
        position.top = this.state.position.top;
        position.left = this.state.position.left;
        const header = this.m_headerRef.current;
        if (header) {
          if (this.state.position.left) {
            if (
              this.state.position.left <
              this.props.boundaries.x1 -
                header.clientWidth +
                this.m_borderOffset
            ) {
              position.left =
                this.props.boundaries.x1 -
                header.clientWidth +
                this.m_borderOffset;
            }
            if (
              this.state.position.left >
              this.props.boundaries.x2 - this.m_borderOffset
            ) {
              position.left = this.props.boundaries.x2 - this.m_borderOffset;
            }
          }
          if (this.state.position.top) {
            if (this.state.position.top < this.props.boundaries.y1) {
              position.top = this.props.boundaries.y1;
            }
            if (
              this.state.position.top >
              this.props.boundaries.y2 - header.clientHeight
            ) {
              position.top = this.props.boundaries.y2 - header.clientHeight;
            }
          }
        }
      }
    }

    return (
      <>
        <div className={windowShadowClasses.join(" ")}></div>

        <section
          className={windowClasses.join(" ")}
          style={{
            zIndex: this.props.application.zIndex,
            top: position.top,
            left: position.left,
            bottom: position.bottom,
            right: position.right,
            height: height,
            width: width,
            opacity: this.state.dragging ? "0.7" : "",
            visibility: this.props.application.minimized
              ? "collapse"
              : "visible"
          }}
          ref={this.m_windowRef}
          onDragStart={() => false}
          draggable="false"
          onMouseDown={this.handleWindowMouseDown}
        >
          <div
            ref={this.m_resizerRef}
            className={[
              styles["resizer"],
              styles[this.props.application.resize]
            ].join(" ")}
            onMouseDown={this.handleResizerDragMouseDown}
            onMouseMove={this.handleResizerMouseMove}
          ></div>
          <div
            className={styles.header}
            style={{
              cursor: this.state.dragging ? "grabbing" : "",
              pointerEvents: this.state.resizing ? "none" : "all"
            }}
            onMouseDown={this.handleDragMouseDown}
            onDoubleClick={this.handleDragDoubleClick}
            onDragStart={() => false}
            draggable="false"
            ref={this.m_headerRef}
          >
            <div className={styles["button-list"]}>
              <button
                className={styles.red}
                style={{
                  pointerEvents:
                    this.state.dragging || this.state.resizing ? "none" : "all"
                }}
                onClick={(e) => this.handleRedClick(e)}
                onMouseDown={(e) => e.stopPropagation()}
              ></button>
              <button
                className={styles.orange}
                style={{
                  pointerEvents:
                    this.state.dragging || this.state.resizing ? "none" : "all"
                }}
                onClick={(e) => this.handleOrangeClick(e)}
                onMouseDown={(e) => e.stopPropagation()}
              ></button>
              <button
                className={styles.green}
                style={{
                  pointerEvents:
                    this.state.dragging || this.state.resizing ? "none" : "all"
                }}
                onClick={(e) => this.handleGreenClick(e)}
                onMouseDown={(e) => e.stopPropagation()}
              ></button>
            </div>
            <h2>{this.props.application.displayName}</h2>
          </div>
          <div className={styles["background"]}>
            {this.props.application.component
              ? createElement(this.props.application.component, {})
              : ""}
          </div>
        </section>
      </>
    );
  }
}
