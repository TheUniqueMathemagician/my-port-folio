import classes from "./Radio.module.scss";
import { FunctionComponent, memo, useCallback } from "react";

interface IProps {
  name: string;
  label?: string;
  value: number;
  checked: boolean;
}

const Radio: FunctionComponent<IProps> = (props) => {
  const { name, value, checked, label } = props;

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

  return (
    <label className={classes["root"]}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      ></input>
      <div className={classes["radio"]}>
        <div className={classes["effect"]}></div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

const isEqual = (prevProps: IProps, nextProps: IProps): boolean => {
  if (prevProps.checked !== nextProps.checked) {
    return false;
  }
  if (prevProps.value !== nextProps.value) {
    return false;
  }
  if (prevProps.name !== nextProps.name) {
    return false;
  }
  return true;
};

export default memo(Radio, isEqual);
