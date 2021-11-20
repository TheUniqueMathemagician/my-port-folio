import {FC, memo, PropsWithChildren, useCallback, useEffect, useRef} from "react";
import Button from "./input/Button";
import classes from "./Tab.module.scss";

interface Props {
  label: string;
  value: number;
  active: boolean;
}

const Tab: FC<Props> = (props) => {
  const {active, label, value} = props;

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
      role="tab"
      title={label}
      aria-controls={`tabpanel-${ value }`}
    >
      {label}
    </Button>
  );
};

export default memo<PropsWithChildren<Props>>(Tab);
