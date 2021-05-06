import classes from "./Radio.module.scss";
import { FunctionComponent, memo, useCallback } from "react";

interface IProps {
  checked: boolean;
  disabeld?: boolean;
  label?: string;
  name: string;
  noSelect?: boolean;
  readOnly?: boolean;
  value: number;
}

const Radio: FunctionComponent<IProps> = (props) => {
  const { checked, disabeld, label, name, noSelect, readOnly, value } = props;

  const rootClasses = [classes["root"]];

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.dispatchEvent(
        new CustomEvent<number>("input", {
          detail: value,
          bubbles: true
        })
      );
    },
    [value]
  );

  if (noSelect) rootClasses.push(classes["no-select"]);

  return (
    <label className={rootClasses.join(" ")}>
      <input
        checked={checked}
        disabled={disabeld}
        name={name}
        onChange={handleChange}
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
