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

type HTMLProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
interface IPropsA extends Omit<HTMLProps, "onClick"> {
  align?: "center" | "end" | "start";
  color?: TColor;
  readOnly: undefined;
  contrast?: boolean;
  endIcon?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
  focusable?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLLinkElement>;
  outlined?: boolean;
  ripple?: boolean;
  size?: TSize;
  startIcon?: boolean;
  to?: string;
  variant?: "flat" | "filled" | "blur";
}

interface IPropsButton extends Omit<HTMLProps, "onClick"> {
  align?: "center" | "end" | "start";
  color?: TColor;
  readOnly?: boolean;
  contrast?: boolean;
  endIcon?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
  focusable?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLLinkElement>;
  outlined?: boolean;
  ripple?: boolean;
  size?: TSize;
  startIcon?: boolean;
  to: undefined;
  variant?: "flat" | "filled" | "blur";
}

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IPropsA | IPropsButton>
>((props, parentRef) => {
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
    loading,
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
          const BC = button.getBoundingClientRect();
          const x = e.clientX - BC.x;
          const y = e.clientY - BC.y;
          const ripple = document.createElement("span");
          ripple.classList.add(classes["ripple"]);
          ripple.style.left = `${x}px`;
          ripple.style.top = `${y}px`;
          button.prepend(ripple);
          setTimeout(() => {
            ripple.remove();
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
      button.style.setProperty("--text-color", contrastColor(backgroundColor));
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
  if (loading) rootClasses.push(classes["loading"]);
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
      rel: to ? "noreferrer noopener" : undefined,
      readOnly,
      target: to ? "_blank" : undefined,
      ...other
    },
    <>
      <div className={classes["content"]}>{children}</div>
      <div className={classes["loader"]}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" />
        </svg>
      </div>
    </>
  );
});

export default memo(Button);
