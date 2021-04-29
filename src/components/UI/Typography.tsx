import {
  createElement,
  FunctionComponent
  // useEffect,
  // useMemo,
  // useRef
} from "react";
import classes from "./Typography.module.scss";

interface IProps {
  noSelect?: boolean;
  noWrap?: boolean;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h1" | "body" | "p";
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h1" | "div" | "p" | "span";
  color?:
    | "error"
    | "hint"
    | "info"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
}

const Typography: FunctionComponent<IProps> = (props) => {
  const { children, color, noSelect, noWrap, tag, variant } = props;
  const rootClasses = [classes["root"]];
  // const childRef = useRef<HTMLElement>(null);
  // const parentRef = useRef<HTMLDivElement>(null);

  if (variant) rootClasses.push(classes[variant]);
  if (color) rootClasses.push(classes[color]);
  if (noSelect) rootClasses.push(classes["no-select"]);

  // const resizeObserver = useMemo(
  //   () =>
  //     noWrap
  //       ? new ResizeObserver((entries) => {
  //           console.log(entries);

  //           if (parentRef.current && childRef.current) {
  //             childRef.current.style.width = `${parentRef.current?.clientWidth}px`;
  //           }
  //         })
  //       : null,
  //   [noWrap]
  // );

  // useEffect(() => {
  //   const parent = parentRef.current;
  //   if (parent) resizeObserver?.observe(parent);
  //   return () => {
  //     if (parent) resizeObserver?.unobserve(parent);
  //   };
  // }, [parentRef, resizeObserver]);

  // if (noWrap) {
  //   return (
  //     <div className={classes["no-wrap"]} ref={parentRef}>
  //       {createElement(tag || "div", {
  //         children,
  //         className: rootClasses.join(" "),
  //         ref: childRef
  //       })}
  //     </div>
  //   );
  // }

  if (noWrap) {
    return (
      <div className={classes["no-wrap"]}>
        {createElement(tag ?? variant === "body" ? "div" : variant, {
          children,
          className: rootClasses.join(" ")
        })}
      </div>
    );
  }

  return createElement(tag ?? variant === "body" ? "div" : variant, {
    children,
    className: rootClasses.join(" ")
  });
};

export default Typography;
