import { FunctionComponent } from "react";
import styles from "./Divider.module.scss";

interface IProps {
  dark?: boolean;
  inset?: boolean;
  vertical?: boolean;
}

const Divider: FunctionComponent<IProps> = (props) => {
  const { dark, inset, vertical } = props;
  const classes: string[] = [styles.divider];
  if (dark) {
    classes.push(styles.dark);
  }
  if (inset) {
    classes.push(styles.inset);
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
