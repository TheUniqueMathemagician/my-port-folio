import classes from "./Text.module.css";
import { FunctionComponent } from "react";

export interface IProps {}

const Text: FunctionComponent<IProps> = (props) => {
  const {} = props;
  const rootClasses = [classes["root"]];
  return (
    <div className={rootClasses.join(" ")}>
      <input type="text"></input>
      <div className={classes["effect"]}></div>
    </div>
  );
};

export default Text;
