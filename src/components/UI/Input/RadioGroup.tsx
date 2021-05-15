import classes from "./RadioGroup.module.scss";
import { FunctionComponent, memo, PropsWithChildren } from "react";

interface IProps {}

const RadioGroup: FunctionComponent<IProps> = (props) => {
  const { children } = props;

  return <div className={classes["root"]}>{children}</div>;
};

export default memo<PropsWithChildren<IProps>>(RadioGroup);
