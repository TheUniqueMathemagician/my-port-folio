import classes from "./RadioGroup.module.scss";
import { FunctionComponent, useCallback, useEffect, useRef } from "react";

interface IProps {
  onChange: (value: number) => void;
}

const RadioGroup: FunctionComponent<IProps> = (props) => {
  const { children, onChange } = props;

  const ref = useRef<HTMLDivElement>(null);

  const handleInput = useCallback(
    (e: CustomEvent<number>) => {
      e.stopPropagation();
      // TODO: Hard trace bug => double call, with the second undefined
      if (e.detail !== undefined) {
        onChange(e.detail);
      }
    },
    [onChange]
  );

  useEffect(() => {
    const el = ref.current;
    el?.addEventListener<any>("input", handleInput);
    return () => {
      el?.removeEventListener<any>("input", handleInput);
    };
  }, [handleInput]);

  return (
    <div className={classes["root"]} ref={ref}>
      {children}
    </div>
  );
};

export default RadioGroup;
