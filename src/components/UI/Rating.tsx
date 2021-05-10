import classes from "./Rating.module.scss";
import { FunctionComponent, memo, useCallback, useRef, useState } from "react";
import { MdStar } from "react-icons/md";
import generateID from "../../functions/generateID";

interface IProps {
  max?: number;
  min?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: number) => void;
  output?: boolean;
  defaultValue?: number;
}

// TODO: add memo for all icons
const Star = memo(() => <MdStar></MdStar>);

const Rating: FunctionComponent<IProps> = (props) => {
  const {
    onChange,
    defaultValue,
    max,
    min,
    disabled,
    output,
    readOnly
  } = props;
  const [state, setState] = useState<number | null>(defaultValue ?? null);

  const id = useRef<string>(generateID());

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      const value = +(e.target as HTMLInputElement).value ?? null;
      setState(value);
      onChange?.(value);
    },
    [onChange, disabled, readOnly]
  );

  const rates: number[] = [];

  const rootClasses = [classes["root"]];

  for (let i = min ?? 0; i <= (max ?? 0); i++) {
    rates.push(i);
  }

  return (
    <fieldset disabled={disabled} className={rootClasses.join(" ")}>
      {rates.map((i) => (
        <label
          key={i}
          aria-selected={i === state}
          aria-checked={i === state}
          aria-readonly={readOnly}
        >
          <input
            readOnly={readOnly}
            disabled={disabled}
            value={i}
            type="radio"
            aria-labelledby={id.current}
            name={id.current + "_" + i}
            onChange={handleChange}
            checked={i === state}
          ></input>
          <span id={id.current}>{i + 1} étoile(s)</span>
          <Star></Star>
        </label>
      ))}
      {output && (
        <output name="result">
          {state ?? 0}/{10}
        </output>
      )}
    </fieldset>
  );
};

export default memo(Rating);
