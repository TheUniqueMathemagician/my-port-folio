import classes from "./Table.module.scss";
import { FunctionComponent } from "react";
import { TSize } from "../../types/TSize";

interface IProps {
  fullWidth?: boolean;
  outlined?: boolean;
  size?: TSize;
}

const Table: FunctionComponent<IProps> = (props) => {
  const { children, outlined, fullWidth } = props;

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (outlined) rootClasses.push(classes["outlined"]);

  return <table className={rootClasses.join(" ")}>{children}</table>;
};

export default Table;
