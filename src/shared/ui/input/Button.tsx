import Link from "next/link";
import React, {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, MouseEventHandler, PropsWithChildren, RefObject, useCallback, useEffect, useRef} from "react";
import contrastColor from "../../../functions/contrastColor";
import {useSelector} from "../../../hooks/Store";
import {TColor} from "../../../types/TColor";
import {TSize} from "../../../types/TSize";
import classes from "./Button.module.scss";

type HTMLProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface PropsButtonA extends HTMLProps {
  align?: "center" | "end" | "start";
  color?: TColor;
  readOnly?: undefined;
  contrast?: boolean;
  endIcon?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
  focusable?: boolean;
  loading?: boolean;
  outlined?: boolean;
  ripple?: boolean;
  size?: TSize;
  startIcon?: boolean;
  to: string;
  variant?: "flat" | "filled" | "blur";
}

interface PropsButtonB extends HTMLProps {
  align?: "center" | "end" | "start";
  color?: TColor;
  readOnly?: boolean;
  contrast?: boolean;
  endIcon?: boolean;
  isIcon?: boolean;
  fullWidth?: boolean;
  focusable?: boolean;
  loading?: boolean;
  outlined?: boolean;
  ripple?: boolean;
  size?: TSize;
  to?: undefined;
  startIcon?: boolean;
  variant?: "flat" | "filled" | "blur";
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<PropsButtonA | PropsButtonB>>((props, parentRef) => {
  const {ripple, readOnly, color, fullWidth, size, variant, startIcon, endIcon, align, contrast, outlined, isIcon, className, loading, children, onClick, ...rest} = props;

  const innerRef = useRef<HTMLElement>(null);
  const ref = (parentRef as RefObject<HTMLButtonElement>) ?? innerRef;

  const palette = useSelector((store) => store.theme.palette);
  const colorScheme = useSelector((store) => store.theme.colorScheme);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code !== "Space" || !ripple || readOnly || !ref.current) return;

    const button = ref.current;

    const x = button.clientWidth / 2;
    const y = button.clientHeight / 2;
    const ripples = document.createElement("span");

    ripples.classList.add(classes["ripple"]);
    ripples.style.left = `${ x }px`;
    ripples.style.top = `${ y }px`;

    button.appendChild(ripples);

    setTimeout(() => {ripples.remove();}, 666);
  }, [ripple, readOnly]);

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    if (!ripple || readOnly || !ref.current) return;

    const BC = ref.current.getBoundingClientRect();
    const x = e.clientX - BC.x;
    const y = e.clientY - BC.y;
    const element = document.createElement("span");

    element.classList.add(classes["ripple"]);
    element.style.left = `${ x }px`;
    element.style.top = `${ y }px`;

    ref.current.prepend(element);

    onClick?.(e);
    setTimeout(() => {element.remove();}, 666);
  }, [ripple, readOnly]);

  useEffect(() => {
    if (!ref.current) return;

    const button = ref.current;

    const backgroundColor = palette[color ?? "background"][colorScheme];
    button.style.setProperty("--text-color", contrastColor(backgroundColor));
  }, [colorScheme, palette, color]);

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (size) rootClasses.push(classes[size]);
  if (variant) rootClasses.push(classes[variant]);
  if (startIcon) rootClasses.push(classes["has-start-img"]);
  if (endIcon) rootClasses.push(classes["has-end-img"]);
  if (align) rootClasses.push(classes[`align--${ align }`]);
  if (color) rootClasses.push(classes[color]);
  if (contrast) rootClasses.push(classes["contrast"]);
  if (outlined) rootClasses.push(classes["outlined"]);
  if (isIcon) rootClasses.push(classes["is-icon"]);
  if (className) rootClasses.push(className);
  if (loading) rootClasses.push(classes["loading"]);

  if (props.to) return <Link href={props.to}>
    <a className={rootClasses.join(" ")} {...rest}>
      <div className={classes["content"]}>{children}</div>
      <div className={classes["loader"]}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" />
        </svg>
      </div>
    </a>
  </Link>;

  return <button className={rootClasses.join(" ")} onClick={handleClick} onKeyPress={handleKeyPress} ref={ref} {...rest}>
    <div className={classes["content"]}>{children}</div>
    <div className={classes["loader"]}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>
  </button>;
});

export default Button;
