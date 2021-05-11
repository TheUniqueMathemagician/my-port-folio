import classes from "./Button.module.scss";
import {
  createElement,
  forwardRef,
  memo,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from "react";
import { TSize } from "../../../types/TSize";
import { TColor } from "../../../types/TColor";
import { useSelector } from "../../../hooks/Store";
import contrastColor from "../../../functions/contrastColor";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  align?: "center" | "end" | "start";
  color?: TColor;
  className?: string;
  contrast?: boolean;
  disabled?: boolean;
  endIcon?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
  focusable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  outlined?: boolean;
  readOnly?: boolean;
  ripple?: boolean;
  size?: TSize;
  startIcon?: boolean;
  to?: string;
  variant?: "flat" | "filled" | "blur";
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IProps>>(
  (props, parentRef) => {
    const {
      align,
      children,
      className,
      color,
      contrast,
      disabled,
      endIcon,
      fullWidth,
      focusable,
      isIcon,
      onClick,
      outlined,
      readOnly,
      ripple,
      size,
      startIcon,
      to,
      variant,
      ...other
    } = props;

    const innerRef = useRef<HTMLButtonElement>(null);
    const ref = (parentRef as RefObject<HTMLButtonElement>) ?? innerRef;

    const palette = useSelector((store) => store.theme.palette);
    const colorScheme = useSelector((store) => store.theme.colorScheme);

    const handleClick = useCallback(
      (e: React.MouseEvent<any, MouseEvent>) => {
        if (ref && ripple && !readOnly) {
          const button = ref.current;
          if (button) {
            const x = e.clientX - button.getBoundingClientRect().x;
            const y = e.clientY - button.getBoundingClientRect().y;
            const ripples = document.createElement("span");
            ripples.classList.add(classes["ripple"]);
            ripples.style.left = `${x}px`;
            ripples.style.top = `${y}px`;
            button.appendChild(ripples);
            setTimeout(() => {
              ripples.remove();
            }, 666);
          }
        }
        onClick?.(e);
      },
      [onClick, ripple, readOnly, ref]
    );

    useEffect(() => {
      const button = ref.current;
      if (button) {
        const backgroundColor = palette[color ?? "background"][colorScheme];
        button.style.setProperty(
          "--text-color",
          contrastColor(backgroundColor)
        );
      }
    }, [ref, colorScheme, palette, color]);

    const rootClasses = [classes["root"]];

    if (fullWidth) rootClasses.push(classes["full-width"]);
    if (size) rootClasses.push(classes[size]);
    if (variant) rootClasses.push(classes[variant]);
    if (startIcon) rootClasses.push(classes["has-start-img"]);
    if (endIcon) rootClasses.push(classes["has-end-img"]);
    if (align) rootClasses.push(classes[`align--${align}`]);
    if (color) rootClasses.push(classes[color]);
    if (contrast) rootClasses.push(classes["contrast"]);
    if (outlined) rootClasses.push(classes["outlined"]);
    if (isIcon) rootClasses.push(classes["is-icon"]);
    if (className) rootClasses.push(className);

    return createElement(
      to ? "a" : "button",
      {
        className: rootClasses.join(" "),
        onClick: handleClick,
        disabled,
        ref,
        tabIndex: focusable && !readOnly ? 0 : -1,
        href: to ?? undefined,
        rel: to?.startsWith("/") ? undefined : "noreferrer noopener",
        readOnly,
        target: to?.startsWith("/") ? undefined : "_blank",
        ...other
      },
      typeof children === "string" ? <div>{children}</div> : children
    );
  }
);

export default memo(Button);
