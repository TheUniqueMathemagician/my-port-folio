import {FC, memo} from "react";
import classes from "./RadioGroup.module.scss";

const RadioGroup: FC = ({children}) => <div className={classes["root"]}>{children}</div>;

export default memo(RadioGroup);
