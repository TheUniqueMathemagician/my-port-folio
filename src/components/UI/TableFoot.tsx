import { FunctionComponent } from "react";
import classes from "./TableFoot.module.scss";

interface IProps {}

const TableFoot: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <tfoot className={classes["root"]}>{children}</tfoot>;
};

export default TableFoot;
