import classes from "./TableRow.module.scss";
import { FunctionComponent } from "react";

interface IProps {}

const TableRow: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <tr className={classes["root"]}>{children}</tr>;
};

export default TableRow;
