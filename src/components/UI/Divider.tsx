import { FunctionComponent, memo } from "react";
import styles from "./Divider.module.scss";

interface IProps {
  inset?: boolean;
  margin?: boolean;
  vertical?: boolean;
}

const Divider: FunctionComponent<IProps> = (props) => {
  const { inset, margin, vertical } = props;
  const classes: string[] = [styles.divider];
  if (inset) {
    classes.push(styles.inset);
  }
  if (margin) {
    classes.push(styles.margin);
  }
  if (vertical) {
    classes.push(styles.vertical);
  }
  return (
    <div className={classes.join(" ")}>
      <hr></hr>
    </div>
  );
};

export default memo(Divider);
