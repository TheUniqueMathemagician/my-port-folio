import classes from "./Radio.module.scss";
import { FunctionComponent, memo } from "react";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onClick" | "type"
  > {
  readonly color?:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error";
  readonly label: string;
  readonly noSelect?: boolean;
  readonly onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

const Radio: FunctionComponent<IProps> = (props) => {
  const { label, noSelect, onClick, className, ...other } = props;

  const rootClasses = [classes["root"]];

  if (noSelect) rootClasses.push(classes["no-select"]);
  if (className) rootClasses.push(className);

  return (
    <label className={rootClasses.join(" ")} onClick={onClick}>
      <input type="radio" {...other}></input>
      <div className={classes["radio"]}>
        <div className={classes["effect"]}></div>
      </div>
      {label && <span className={classes["label"]}>{label}</span>}
    </label>
  );
};

export default memo(Radio);
