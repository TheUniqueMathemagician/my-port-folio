import classes from "./Table.module.scss";
import { FunctionComponent } from "react";
import { TSize } from "../../types/TSize";

interface IProps {
  fullWidth?: boolean;
  size?: TSize;
}

const Table: FunctionComponent<IProps> = (props) => {
  const { children, fullWidth } = props;

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);

  return <table className={rootClasses.join(" ")}>{children}</table>;
};

export default Table;
