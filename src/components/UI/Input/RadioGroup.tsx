import classes from "./RadioGroup.module.scss";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";

interface IProps {}

const RadioGroup: FunctionComponent<IProps> = (props) => {
  const { children } = props;

  return <div className={classes["root"]}>{children}</div>;
};

export default RadioGroup;
