import classes from "./Paper.module.scss";
import { FunctionComponent } from "react";
import { useSelector } from "../../hooks/Store";
import { EColorScheme } from "../../types/EColorScheme";
import { TColor } from "../../types/TColor";

interface IProps {
  className?: string;
  background?: TColor;
  fullWidth?: boolean;
  outlined?: boolean;
  spaced?: boolean;
}

const Paper: FunctionComponent<IProps> = (props) => {
  const {
    background,
    children,
    className,
    fullWidth,
    outlined,
    spaced
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

  return <div className={rootClasses.join(" ")}>{children}</div>;
};

export default Paper;
