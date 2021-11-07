import {FC} from "react";
import classes from "./ButtonGroup.module.scss";

const ButtonGroup: FC = ({children}) => <div className={classes["root"]}>{children}</div>;

export default ButtonGroup;
