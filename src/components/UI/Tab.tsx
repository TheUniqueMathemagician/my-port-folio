import classes from "./Tab.module.scss";
import { FunctionComponent, memo, useCallback, useEffect, useRef } from "react";
import Button from "./Button";

// TODO: try to remove active value
interface IProps {
  label: string;
  value: number;
  active: boolean;
}

const Tab: FunctionComponent<IProps> = (props) => {
  const { active, label, value } = props;

  const ref = useRef<HTMLButtonElement>(null);

  const handleclick = useCallback(() => {
    const button = ref.current;
    if (button) {
      button.dispatchEvent(
        new CustomEvent<number>("input", {
          detail: value,
          bubbles: true
        })
      );
    }
  }, [value]);

  useEffect(() => {
    if (ref.current && active) {
      ref.current.dispatchEvent(
        new CustomEvent<number>("input", {
          detail: value,
          bubbles: true
        })
      );
    }
  }, [active, value]);

  const rootClasses = [classes["root"]];

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

export default memo(Tab);
