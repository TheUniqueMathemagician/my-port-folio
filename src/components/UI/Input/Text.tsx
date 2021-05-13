import classes from "./Text.module.scss";
import { FunctionComponent, useCallback, useState } from "react";

export interface IProps {
  readonly label?: string;
  readonly required?: boolean;
  readonly type?: "password" | "text" | "email" | "tel";
  readonly validator?: RegExp;
  readonly fullWidth?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Text: FunctionComponent<IProps> = (props) => {
  const { fullWidth, onChange, label, required, type } = props;

  const [value, setValue] = useState<string>("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  }, []);

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);

  return (
    <label className={rootClasses.join(" ")}>
      <input
        onChange={handleChange}
        required={required}
        type={type ?? "text"}
        value={value}
      ></input>
      {label && <span>{label}</span>}
      <div className={classes["effect"]}></div>
    </label>
  );
};

export default Text;
