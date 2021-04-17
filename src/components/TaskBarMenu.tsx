import IPosition from "../types/IPosition";
import React from "react";

import styles from "./TaskBarMenu.module.scss";

interface IProps {
  position: IPosition;
  shown: boolean;
}

const TaskBarMenu: React.FunctionComponent<IProps> = ({
  shown,
  position,
  children
}) => {
  const classes = [styles["task-bar-menu"], shown ? styles["shown"] : ""].join(
    " "
  );

  if (!shown && typeof position.bottom === "number") {
    position.bottom = position.bottom - 6;
  }

  return (
    <nav
      className={classes}
      style={{
        top: position.top ?? "",
        left: position.left ?? "",
        bottom: position.bottom ?? "",
        right: position.right ?? "",
        pointerEvents: shown ? "all" : "none",
        opacity: shown ? 1 : 0,
        transition: "all .3s ease"
      }}
    >
      {children}
    </nav>
  );
};

export default TaskBarMenu;
