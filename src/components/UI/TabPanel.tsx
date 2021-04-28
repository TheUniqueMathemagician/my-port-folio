import classes from "./TabPanel.module.scss";
import { FunctionComponent } from "react";

interface IPropsA {
  children?: React.ReactNode;
  className?: string;
  index: number;
  spaced?: boolean;
  value: number;
}

interface IPropsB {
  children?: React.ReactNode;
  className?: string;
  index: string;
  spaced?: boolean;
  value: string;
}

const TabPanel: FunctionComponent<IPropsA | IPropsB> = (props) => {
  const { className, children, spaced, value, index, ...other } = props;
  const rootClasses = [classes["root"]];
  if (spaced) rootClasses.push(classes["spaced"]);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={rootClasses.join(" ")}
      // aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
