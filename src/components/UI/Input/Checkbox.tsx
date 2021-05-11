import classes from "./Checkbox.module.scss";
import { FunctionComponent, memo } from "react";
import { TSize } from "../../../types/TSize";
import Mark from "../../icons/Mark";

interface IProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  outlined?: boolean;
  name?: string;
  size?: TSize;
  startIcon?: boolean;
  checked: boolean;
  variant?: "flat" | "filled" | "blur";
}

const Checkbox: FunctionComponent<IProps> = (props) => {
  const {
    checked,
    color,
    disabled,
    name,
    onChange,
    onClick,
    outlined,
    size,
    variant
  } = props;
  const rootClasses = [classes["root"]];

  if (outlined) rootClasses.push(classes["outlined"]);
  if (size) rootClasses.push(classes[size]);
  if (variant) rootClasses.push(classes[variant]);
  if (color) rootClasses.push(classes[color]);

  return (
    <label className={rootClasses.join(" ")} onClick={onClick}>
      <input
        disabled={disabled}
        checked={checked}
        type="checkbox"
        name={name}
        onChange={onChange}
        aria-label="Checkbox"
      ></input>
      <div className={classes["checkbox"]}>
        <div className={classes["effect"]}></div>
        <Mark></Mark>
      </div>
    </label>
  );
};

export default memo(Checkbox);
