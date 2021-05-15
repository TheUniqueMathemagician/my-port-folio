import classes from "./Checkbox.module.scss";
import { FunctionComponent, memo } from "react";
import { TSize } from "../../../types/TSize";
import Mark from "../../icons/Mark";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onClick" | "size" | "type"
  > {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  size?: TSize;
}

const Checkbox: FunctionComponent<IProps> = (props) => {
  const { className, color, onClick, size, ...other } = props;
  const rootClasses = [classes["root"]];

  if (size) rootClasses.push(classes[size]);
  if (color) rootClasses.push(classes[color]);
  if (className) rootClasses.push(className);

  return (
    <label className={rootClasses.join(" ")} onClick={onClick}>
      <input type="checkbox" {...other}></input>
      <div className={classes["checkbox"]}>
        <div className={classes["effect"]}></div>
        <Mark></Mark>
      </div>
    </label>
  );
};

export default memo(Checkbox);
