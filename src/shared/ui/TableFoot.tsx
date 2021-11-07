import {FC} from "react";
import classes from "./TableFoot.module.scss";

const TableFoot: FC = ({children}) => <tfoot className={classes["root"]}>{children}</tfoot>;

export default TableFoot;
