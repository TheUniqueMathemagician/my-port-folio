import {FC, memo} from "react";
import classes from "./Divider.module.scss";

interface Props {
  inset?: boolean;
  margin?: boolean;
  vertical?: boolean;
}

const Divider: FC<Props> = (props) => {
  const {inset, margin, vertical} = props;

  const rootClasses = [classes["root"]];

  if (inset) rootClasses.push(classes["inset"]);
  if (margin) rootClasses.push(classes["margin"]);
  if (vertical) rootClasses.push(classes["vertical"]);

  return <div className={rootClasses.join(" ")}>
    <hr></hr>
  </div>;
};

export default memo(Divider);
