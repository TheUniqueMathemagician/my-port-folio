import {FC} from "react";
import classes from "./TableRow.module.scss";

const TableRow: FC = ({children}) => <tr className={classes["root"]}>{children}</tr>;

export default TableRow;
