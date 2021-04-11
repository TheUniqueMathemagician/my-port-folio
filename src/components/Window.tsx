import React, { Component, createElement, createRef } from "react";

import styles from "./Window.module.scss";
import IPosition from "../types/IPosition";
import ESnap from "../types/ESnap";
import WindowInstance from "../data/classes/WindowInstance";
import IBoundaries from "../types/IBoundaries";
import WindowHeader from "./WindowHeader";
import WindowResizer from "./WindowResizer";
interface IState {
  snap: ESnap;
}
interface IProps {
  application: WindowInstance;
  boundaries: IBoundaries;
  borderOffset: number;
  resizerWidth: number;
}

// TODO: Refactor => component must have single concern
// Separate resizer and dragger
export default class Window extends Component<IProps, IState> {
  private m_windowRef: React.RefObject<HTMLDivElement>;
  private m_headerRef: React.RefObject<HTMLDivElement>;

  private m_borderOffset: number = 16;

  constructor(props: IProps) {
    super(props);

    this.m_windowRef = createRef<HTMLDivElement>();
    this.m_headerRef = createRef<HTMLDivElement>();

    const snap: ESnap = ESnap.none;
    this.state = {
      snap
    };

    this.handleWindowMouseDown = this.handleWindowMouseDown.bind(this);
    this.setShadow = this.setShadow.bind(this);
  }

  componentDidMount() {
    this.props.application.position = {
      bottom: null,
      left:
        (this.props.boundaries.x2 -
          this.props.boundaries.x1 -
          this.props.application.width) /
        2,
      right: null,
      top:
        (this.props.boundaries.y2 -
          this.props.boundaries.y1 -
          this.props.application.height) /
        2
    };
  }

  private handleWindowMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    this.props.application.sendToFront();
  }

  private setShadow(shadow: ESnap) {
    this.setState((state) => ({ ...state, snap: shadow }));
  }

  public render() {
    const windowClasses: string[] = [styles["window"]];
    const windowShadowClasses: string[] = [styles["window-shadow"]];
    let width: number | "" = "";
    let height: number | "" = "";
    let position: IPosition = {
      bottom: null,
      left: null,
      right: null,
      top: null
    };

    const checkBoundaries = () => {
      if (this.props.application.position.left) {
        if (
          this.props.application.position.left <
          this.props.boundaries.x1 -
            this.props.application.width +
            this.m_borderOffset
        ) {
          position.left =
            this.props.boundaries.x1 -
            this.props.application.width +
            this.m_borderOffset;
        }
        if (
          this.props.application.position.left >
          this.props.boundaries.x2 - this.m_borderOffset
        ) {
          position.left = this.props.boundaries.x2 - this.m_borderOffset;
        }
      }
      if (this.props.application.position.top) {
        if (this.props.application.position.top < this.props.boundaries.y1) {
          position.top = this.props.boundaries.y1;
        }
        if (
          this.props.application.position.top >
          this.props.boundaries.y2 - this.m_borderOffset
        ) {
          position.top = this.props.boundaries.y2 - this.m_borderOffset;
        }
      }
    };

    if (this.props.application.maximized) {
      windowClasses.push(styles[`snap-${this.props.application.maximized}`]);
    } else if (this.props.application.resizing) {
      position.top = this.props.application.position.top;
      position.left = this.props.application.position.left;
      position.right = this.props.application.position.right;
      position.bottom = this.props.application.position.bottom;
      checkBoundaries();
    } else {
      position.top = this.props.application.position.top;
      position.left = this.props.application.position.left;
      width = this.props.application.width;
      height = this.props.application.height;
      if (this.state.snap) {
        windowShadowClasses.push(styles[`snap-${this.state.snap}`]);
      }
      checkBoundaries();
    }

    return (
      <>
        <div className={windowShadowClasses.join(" ")}></div>
        <section
          className={windowClasses.join(" ")}
          style={{
            zIndex: this.props.application.zIndex,
            top: position.top ?? "",
            left: position.left ?? "",
            bottom: position.bottom ?? "",
            right: position.right ?? "",
            height: height,
            width: width,
            opacity: this.props.application.dragging ? "0.7" : "",
            visibility: this.props.application.minimized
              ? "collapse"
              : "visible"
          }}
          ref={this.m_windowRef}
          onDragStart={() => false}
          draggable="false"
          onMouseDown={this.handleWindowMouseDown}
        >
          <WindowResizer
            application={this.props.application}
            windowRef={this.m_windowRef}
          ></WindowResizer>
          <WindowHeader
            application={this.props.application}
            boundaries={this.props.boundaries}
            setShadow={this.setShadow}
          ></WindowHeader>
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
