import classes from "./ButtonGroup.module.scss";
import { FunctionComponent } from "react";

interface IProps {}

const ButtonGroup: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  const rootClasses = [classes["root"]];

  return <div className={rootClasses.join(" ")}>{children}</div>;
};

export default ButtonGroup;
