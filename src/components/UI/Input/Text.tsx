import classes from "./Text.module.scss";
import { FunctionComponent } from "react";

export interface IProps {
  readonly label?: string;
  readonly required?: boolean;
  readonly type?: "password" | "text" | "email" | "tel";
  readonly validator?: RegExp;
  readonly fullWidth?: boolean;
}

const Text: FunctionComponent<IProps> = (props) => {
  const { fullWidth, label, required, type } = props;

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);

  return (
    <label className={rootClasses.join(" ")}>
      <input required={required} type={type ?? "text"}></input>
      {label && <span>{label}</span>}
      <div className={classes["effect"]}></div>
    </label>
  );
};

export default Text;
