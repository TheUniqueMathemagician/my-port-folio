import classes from "./TabPanel.module.scss";
import { FunctionComponent } from "react";

interface IPropsA
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index: number;
  spaced?: boolean;
  value: number;
}

interface IPropsB
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  index: string;
  spaced?: boolean;
  value: string;
}

const TabPanel: FunctionComponent<IPropsA | IPropsB> = (props) => {
  const { children, spaced, value, index, className, ...other } = props;
  const rootClasses = [classes["root"]];
  if (className) rootClasses.push(className);
  if (spaced) rootClasses.push(classes["spaced"]);
  return (
    <div
      hidden={value !== index}
      role="tabpanel"
      className={rootClasses.join(" ")}
      // aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
