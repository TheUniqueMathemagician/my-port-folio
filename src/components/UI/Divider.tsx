import { FunctionComponent } from "react";
import styles from "./Divider.module.scss";

interface IProps {
  dark?: boolean;
  inset?: boolean;
  margin?: boolean;
  vertical?: boolean;
}

const Divider: FunctionComponent<IProps> = (props) => {
  const { dark, inset, margin, vertical } = props;
  const classes: string[] = [styles.divider];
  if (dark) {
    classes.push(styles.dark);
  }
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

export default Divider;
