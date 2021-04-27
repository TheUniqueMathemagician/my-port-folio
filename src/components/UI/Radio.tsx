import classes from "./Radio.module.scss";
import { FunctionComponent } from "react";

interface IProps {
  name: string;
  value?: string | number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: FunctionComponent<IProps> = (props) => {
  const { onChange, name, value, checked, children } = props;
  return (
    <label className={classes["root"]}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      ></input>
      <div className={classes["radio"]}>
        <div className={classes["effect"]}></div>
      </div>
      <span>{children}</span>
    </label>
  );
};

export default Radio;
