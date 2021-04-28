import classes from "./Tab.module.scss";
import { FunctionComponent, useCallback } from "react";

interface IProps {
  label: string;
  value: number;
  active: boolean;
}

const Tab: FunctionComponent<IProps> = (props) => {
  const { active, label, value } = props;

  const handleclick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.target.dispatchEvent(
        new CustomEvent<number>("input", {
          detail: value,
          bubbles: true
        })
      );
    },
    [value]
  );

  const rootClasses = [classes["root"]];

  if (active) rootClasses.push(classes["active"]);

  return (
    <button className={rootClasses.join(" ")} onClick={handleclick}>
      {label}
    </button>
  );
};

export default Tab;
