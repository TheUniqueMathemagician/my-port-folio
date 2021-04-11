import React, { createRef } from "react";
import WindowInstance from "../data/classes/WindowInstance";
import ESnap from "../types/ESnap";
import IBoundaries from "../types/IBoundaries";
import IOffset from "../types/IOffset";

import styles from "./WindowHeader.module.scss";

interface IProps {
  application: WindowInstance;
  boundaries: IBoundaries;
  setShadow: (shadow: ESnap) => void;
}

interface IState {
  offset: IOffset;
  snap: ESnap;
}

export default class WindowHeader extends React.Component<IProps, IState> {
  private m_headerRef = createRef<HTMLDivElement>();
  /**
   *
   */
  constructor(props: IProps) {
    super(props);
    this.state = { offset: { x: 0, y: 0 }, snap: ESnap.none };
    this.handleRedClick = this.handleRedClick.bind(this);
    this.handleOrangeClick = this.handleOrangeClick.bind(this);
    this.handleGreenClick = this.handleGreenClick.bind(this);
    this.handleDragDoubleClick = this.handleDragDoubleClick.bind(this);
    this.handleDragMouseDown = this.handleDragMouseDown.bind(this);
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
    this.handleDragMouseUp = this.handleDragMouseUp.bind(this);
  }

  private handleDragDoubleClick() {
    if (this.props.application.maximized) {
      this.props.application.maximized = ESnap.none;
    } else {
      this.props.application.maximized = ESnap.top;
    }
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
      this.props.application.maximized = ESnap.none;
    } else {
      this.props.application.maximized = ESnap.top;
    }
  }

  private handleGreenClick(e: React.MouseEvent) {
    e.preventDefault();
    this.props.application.sendToFront();
    this.props.application.minimized = true;
  }

  private handleButtonMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  private handleDragMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();

    const header = this.m_headerRef.current;
    if (!header) return;

    document.body.style.cursor = "grabbing";
    document.addEventListener("mousemove", this.handleDragMouseMove);
    document.addEventListener("mouseup", this.handleDragMouseUp);

    if (this.props.application.maximized) {
      this.setState((state) => ({
        ...state,
        offset: {
          x: this.props.application.width / 2,
          y: header.clientHeight / 2
        }
      }));
    } else {
      this.setState((state) => ({
        ...state,
        offset: {
          x: e.pageX - (this.props.application.position.left || 0),
          y: e.pageY - (this.props.application.position.top || 0)
        }
      }));
    }
  }

  private handleDragMouseMove(e: globalThis.MouseEvent) {
    const header = this.m_headerRef.current;
    if (!header) return;

    e.stopPropagation();
    e.preventDefault();

    this.props.application.dragging = true;

    const shouldSnapToTop = e.pageY - 1 <= this.props.boundaries.y1;
    const shouldSnapToBottom = e.pageY + 1 >= this.props.boundaries.y2;
    const shouldSnapToLeft = e.pageX - 1 <= this.props.boundaries.x1;
    const shouldSnapToRight = e.pageX + 1 >= this.props.boundaries.x2;

    if (shouldSnapToTop && shouldSnapToLeft) {
      this.setState((state) => ({ ...state, snap: ESnap.topLeft }));
    } else if (shouldSnapToTop && shouldSnapToRight) {
      this.setState((state) => ({ ...state, snap: ESnap.topRight }));
    } else if (shouldSnapToBottom && shouldSnapToLeft) {
      this.setState((state) => ({ ...state, snap: ESnap.bottomLeft }));
    } else if (shouldSnapToBottom && shouldSnapToRight) {
      this.setState((state) => ({ ...state, snap: ESnap.bottomRight }));
    } else if (shouldSnapToTop) {
      this.setState((state) => ({ ...state, snap: ESnap.top }));
    } else if (shouldSnapToLeft) {
      this.setState((state) => ({ ...state, snap: ESnap.left }));
    } else if (shouldSnapToRight) {
      this.setState((state) => ({ ...state, snap: ESnap.right }));
    } else if (shouldSnapToBottom) {
      this.setState((state) => ({ ...state, snap: ESnap.bottom }));
    } else {
      this.setState((state) => ({ ...state, snap: ESnap.none }));
      this.props.application.maximized = ESnap.none;
    }

    this.props.setShadow(this.state.snap);

    this.props.application.position = {
      left: e.pageX - this.state.offset.x,
      top: e.pageY - this.state.offset.y,
      right: this.props.application.position.right,
      bottom: this.props.application.position.bottom
    };
  }

  private handleDragMouseUp(e: globalThis.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    document.body.style.cursor = "";
    document.removeEventListener("mousemove", this.handleDragMouseMove);
    document.removeEventListener("mouseup", this.handleDragMouseUp);
    this.props.application.dragging = false;
    this.props.application.maximized = this.state.snap;
  }

  render() {
    return (
      <div
        className={styles["window-header"]}
        style={{
          pointerEvents: this.props.application.dragging ? "none" : "all",
          cursor: this.props.application.resizing
            ? ""
            : this.props.application.dragging
            ? "grabbing"
            : "grab"
        }}
        ref={this.m_headerRef}
        onMouseDown={this.handleDragMouseDown}
        onDoubleClick={this.handleDragDoubleClick}
        draggable={false}
      >
        <div className={styles["button-list"]}>
          <button
            className={styles.red}
            style={{
              pointerEvents: this.props.application.dragging ? "none" : "all"
            }}
            onClick={this.handleRedClick}
            onMouseDown={this.handleButtonMouseDown}
          ></button>
          <button
            className={styles.orange}
            style={{
              pointerEvents: this.props.application.dragging ? "none" : "all"
            }}
            onClick={this.handleOrangeClick}
            onMouseDown={this.handleButtonMouseDown}
          ></button>
          <button
            className={styles.green}
            style={{
              pointerEvents: this.props.application.dragging ? "none" : "all"
            }}
            onClick={this.handleGreenClick}
            onMouseDown={this.handleButtonMouseDown}
          ></button>
        </div>
        <h2>{this.props.application.displayName}</h2>
      </div>
    );
  }
}
