import classes from "./Button.module.scss";
import { FunctionComponent } from "react";

interface IProps {
  align?: "center" | "end" | "start";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  startIcon?: boolean;
  disabled?: boolean;
  endIcon?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "outlined" | "flat" | "filled" | "blur";
  fullWidth?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FunctionComponent<IProps> = (props) => {
  const {
    align,
    children,
    color,
    disabled,
    onClick,
    fullWidth,
    size,
    variant,
    startIcon,
    endIcon
  } = props;

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (size) rootClasses.push(classes[size]);
  if (variant) rootClasses.push(classes[variant]);
  if (startIcon) rootClasses.push(classes["has-start-img"]);
  if (endIcon) rootClasses.push(classes["has-end-img"]);
  if (align) rootClasses.push(classes[`align--${align}`]);
  if (color) rootClasses.push(classes[color]);

  return (
    <button
      className={rootClasses.join(" ")}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
