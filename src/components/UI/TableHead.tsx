import classes from "./TableHead.module.scss";
import { FunctionComponent } from "react";

interface IProps {}

const TableHead: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <thead className={classes["root"]}>{children}</thead>;
};

export default TableHead;
