import {createElement, FunctionComponent, memo, PropsWithChildren} from "react";
import classes from "./TabPanel.module.scss";

interface IProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  index: number;
  spaced?: boolean;
  tag?: "div" | "article";
  value: number;
}

const TabPanel: FunctionComponent<IProps> = (props) => {
  const {children, spaced, value, index, className, tag, ...other} = props;

  const rootClasses = [classes["root"]];

  if (className) rootClasses.push(className);
  if (spaced) rootClasses.push(classes["spaced"]);

  return createElement(tag ?? "div", {
    hidden: value !== index,
    role: "tabpanel",
    className: rootClasses.join(" "),
    ...other
  }, children);
};

export default memo<PropsWithChildren<IProps>>(TabPanel);
