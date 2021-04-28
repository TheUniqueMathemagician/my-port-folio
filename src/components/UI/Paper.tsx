import classes from "./Paper.module.scss";
import { FunctionComponent } from "react";

interface IProps {
  fullWidth?: boolean;
  outlined?: boolean;
  spaced?: boolean;
}

const Paper: FunctionComponent<IProps> = (props) => {
  const { children, fullWidth, outlined, spaced } = props;

  const rootClasses = [classes["root"]];

  if (outlined) rootClasses.push(classes["outlined"]);
  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (spaced) rootClasses.push(classes["padding"]);

  return <div className={rootClasses.join(" ")}>{children}</div>;
};

export default Paper;
