import classes from "./Button.module.scss";
import React, {
  createElement,
  forwardRef,
  memo,
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
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
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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

    const [mouseHasBeenDown, setMouseHasBeenDown] = useState<boolean>(false);

    const palette = useSelector((store) => store.theme.palette);
    const colorScheme = useSelector((store) => store.theme.colorScheme);

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.code === "Space" && ref && ripple && !readOnly) {
          const button = ref.current;
          if (button) {
            const x = button.clientWidth / 2;
            const y = button.clientHeight / 2;
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
      },
      [ref, ripple, readOnly]
    );

    const handleMouseDown = useCallback(() => {
      setMouseHasBeenDown(true);
    }, []);

    const handleMouseUp = useCallback(
      (e: React.MouseEvent) => {
        if (mouseHasBeenDown && ref && ripple && !readOnly) {
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
            setMouseHasBeenDown(false);
          }
        }
      },
      [mouseHasBeenDown, ref, ripple, readOnly]
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
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onKeyPress: handleKeyPress,
        onClick,
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
