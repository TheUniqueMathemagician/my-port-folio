import classes from "./Tab.module.scss";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import Button from "./Button";

interface IProps {
  label: string;
  value: number;
  active: boolean;
}

const Tab: FunctionComponent<IProps> = (props) => {
  const { active, label, value } = props;

  const ref = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (ref.current && active) {
      ref.current.dispatchEvent(
        new CustomEvent<number>("input", {
          detail: value,
          bubbles: true
        })
      );
    }
  }, [ref, active, value]);

  const rootClasses = [classes["root"]];

  if (active) rootClasses.push(classes["active"]);

  return (
    <Button
      ripple
      size="md"
      focusable
      className={rootClasses.join(" ")}
      onClick={handleclick}
      ref={ref}
    >
      {label}
    </Button>
  );
};

export default Tab;
