import classes from "./Text.module.scss";
import { FunctionComponent, memo, useCallback, useState } from "react";

export interface IProps {
  readonly className?: string;
  readonly defaultValue?: string;
  readonly fullWidth?: boolean;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly name?: string;
  readonly onChange?: React.ChangeEventHandler<HTMLInputElement>;
  readonly required?: boolean;
  readonly type?: "password" | "text" | "email" | "tel";
  readonly validator?: RegExp;
}

const Text: FunctionComponent<IProps> = (props) => {
  const {
    className,
    defaultValue,
    fullWidth,
    disabled,
    onChange,
    label,
    name,
    required,
    type
  } = props;

  const [value, setValue] = useState<string>("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  const rootClasses = [classes["root"]];

  if (fullWidth) rootClasses.push(classes["full-width"]);

  return (
    <label className={rootClasses.join(" ")}>
      <input
        className={className}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        name={name}
        required={required}
        type={type ?? "text"}
        value={value}
      ></input>
      {label && <span>{label}</span>}
      <div className={classes["effect"]}></div>
    </label>
  );
};

export default memo(Text);
