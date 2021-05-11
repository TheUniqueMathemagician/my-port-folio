import classes from "./Radio.module.scss";
import { FunctionComponent, memo } from "react";

interface IProps {
  checked: boolean;
  disabeld?: boolean;
  label?: string;
  name: string;
  noSelect?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
  readOnly?: boolean;
  value: number;
}

const Radio: FunctionComponent<IProps> = (props) => {
  const {
    checked,
    disabeld,
    label,
    name,
    noSelect,
    onChange,
    onClick,
    readOnly,
    value
  } = props;

  const rootClasses = [classes["root"]];

  if (noSelect) rootClasses.push(classes["no-select"]);

  return (
    <label className={rootClasses.join(" ")} onClick={onClick}>
      <input
        checked={checked}
        disabled={disabeld}
        name={name}
        onChange={onChange}
        type="radio"
        readOnly={readOnly}
        value={value}
      ></input>
      <div className={classes["radio"]}>
        <div className={classes["effect"]}></div>
      </div>
      {label && <span className={classes["label"]}>{label}</span>}
    </label>
  );
};

export default memo(Radio);
