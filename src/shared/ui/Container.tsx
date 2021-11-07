import {FC} from "react";
import classes from "./Container.module.scss";

interface PropsBox {
  type?: undefined;
  orientation?: undefined;
  space?: boolean;
}

interface PropsFlex {
  type: "flex";
  orientation?: "row" | "column";
  space?: boolean;
}

interface PropsGrid {
  type: "grid";
  orientation?: "row" | "column";
  space?: boolean;
}

const Container: FC<PropsBox | PropsGrid | PropsFlex> = (props) => {
  const {children, orientation, space, type} = props;
  const rootClasses = [classes["root"]];

  switch (orientation) {
    case "column":
      rootClasses.push(classes["column"]);
      break;
    case "row":
      rootClasses.push(classes["row"]);
      break;
  }

  if (space) rootClasses.push(classes["space"]);

  switch (type) {
    case "flex":
      rootClasses.push(classes["flex"]);
      break;
    case "grid":
      rootClasses.push(classes["grid"]);
      break;
  }

  return <div className={rootClasses.join(" ")}>{children}</div>;
};

export default Container;
