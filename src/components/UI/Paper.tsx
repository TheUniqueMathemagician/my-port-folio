import classes from "./Paper.module.scss";
import {
  createElement,
  FunctionComponent,
  memo,
  PropsWithChildren
} from "react";
import { useSelector } from "../../hooks/Store";
import { EColorScheme } from "../../types/EColorScheme";
import { TColor } from "../../types/TColor";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  background?: TColor;
  blur?: boolean;
  fullWidth?: boolean;
  outlined?: boolean;
  spaced?: boolean;
  tag?: "header" | "footer" | "main" | "article" | "section" | "div";
}

const Paper: FunctionComponent<IProps> = (props) => {
  const {
    background,
    blur,
    children,
    className,
    fullWidth,
    outlined,
    spaced,
    tag,
    ...other
  } = props;

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const rootClasses = [classes["root"]];

  if (outlined) rootClasses.push(classes["outlined"]);
  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (spaced) rootClasses.push(classes["padding"]);
  if (contrast) rootClasses.push(classes["contrast"]);
  if (className) rootClasses.push(className);
  if (background) rootClasses.push(classes[background]);
  if (blur) rootClasses.push(classes["blur"]);

  return createElement(
    tag ?? "div",
    { className: rootClasses.join(" "), ...other },
    children
  );
};

export default memo<PropsWithChildren<IProps>>(Paper);
