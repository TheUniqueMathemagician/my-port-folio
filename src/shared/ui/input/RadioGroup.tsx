import {FC, memo, PropsWithChildren} from "react";
import classes from "./RadioGroup.module.scss";

const RadioGroup: FC = ({children}) => <div className={classes["root"]}>{children}</div>;

export default memo<PropsWithChildren<{}>>(RadioGroup);
