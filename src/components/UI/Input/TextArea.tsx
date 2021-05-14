import { FunctionComponent, memo, useCallback, useRef, useState } from "react";

import classes from "./TextArea.module.scss";

interface IProps {
  readonly autoResize?: boolean;
  readonly className?: string;
  readonly defaultValue?: string;
  readonly disabled?: boolean;
  readonly fullWidth?: boolean;
  readonly label?: string;
  readonly name?: string;
  readonly onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  readonly required?: boolean;
  readonly vertical?: boolean;
}

const TextArea: FunctionComponent<IProps> = (props) => {
  const {
    autoResize,
    className,
    defaultValue,
    disabled,
    fullWidth,
    label,
    name,
    onChange,
    required,
    vertical
  } = props;

  const [value, setValue] = useState<string>(defaultValue ?? "");

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (autoResize) {
        e.target.style.height = `${e.target.scrollHeight + 2}px`;
      }
      onChange?.(e);
    },
    [autoResize, onChange]
  );

  const rootClasses = [classes["root"]];

  if (autoResize) rootClasses.push(classes["auto-resize"]);
  if (fullWidth) rootClasses.push(classes["full-width"]);
  if (vertical) rootClasses.push(classes["vertical"]);
  if (className) rootClasses.push(className);

  return (
    <label className={rootClasses.join(" ")}>
      <textarea
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={changeHandler}
        required={required}
        value={value}
      ></textarea>
      {label && <span>{label}</span>}
    </label>
  );
};

export default memo(TextArea);
