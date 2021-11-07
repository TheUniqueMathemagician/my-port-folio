import {FC} from "react";
import classes from "./TableHead.module.scss";

const TableHead: FC = ({children}) => <thead className={classes["root"]}>{children}</thead>;

export default TableHead;
