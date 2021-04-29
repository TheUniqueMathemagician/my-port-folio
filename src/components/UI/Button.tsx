import classes from "./Button.module.scss";
import { FunctionComponent, useCallback } from "react";

interface IProps {
  align?: "center" | "end" | "start";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  disabled?: boolean;
  endIcon?: boolean;
  fullWidth?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  outlined?: boolean;
  ripple?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  startIcon?: boolean;
  variant?: "flat" | "filled" | "blur";
}

const Button: FunctionComponent<IProps> = (props) => {
  const {
    align,
    children,
    color,
    disabled,
    endIcon,
    fullWidth,
    onClick,
    outlined,
    ripple,
    size,
    startIcon,
    variant
  } = props;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (ripple) {
        let button: HTMLButtonElement | null = null;
        const findButton = (element: HTMLElement) => {
          if (
            element &&
            element.parentElement &&
            element.tagName !== "BUTTON"
          ) {
            findButton(element.parentElement);
          } else {
            button = element as HTMLButtonElement;
          }
        };
        findButton(e.target as HTMLElement);
        if (button) {
          const x =
            e.clientX - (button as HTMLButtonElement).getBoundingClientRect().x;
          const y =
            e.clientY - (button as HTMLButtonElement).getBoundingClientRect().y;
          const ripples = document.createElement("span");
          ripples.style.left = `${x}px`;
          ripples.style.top = `${y}px`;
          (button as HTMLButtonElement).appendChild(ripples);
          setTimeout(() => {
            ripples.remove();
          }, 666);
        }
      }
      onClick(e);
    },
    [onClick, ripple]
  );

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (size) rootClasses.push(classes[size]);
  if (variant) rootClasses.push(classes[variant]);
  if (startIcon) rootClasses.push(classes["has-start-img"]);
  if (endIcon) rootClasses.push(classes["has-end-img"]);
  if (align) rootClasses.push(classes[`align--${align}`]);
  if (color) rootClasses.push(classes[color]);
  if (outlined) rootClasses.push(classes["outlined"]);

  return (
    <button
      className={rootClasses.join(" ")}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;