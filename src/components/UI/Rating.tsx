import classes from "./Rating.module.scss";
import { FunctionComponent, memo, useCallback, useRef, useState } from "react";
import { MdStar } from "react-icons/md";
import generateID from "../../functions/generateID";

interface IProps {
  max?: number;
  min?: number;
  half?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onChange: (value: number) => void;
  output?: boolean;
  defaultValue?: number;
}

const Rating: FunctionComponent<IProps> = (props) => {
  const {
    onChange,
    defaultValue,
    max,
    min,
    disabled,
    // half,
    output,
    readOnly
  } = props;
  const [state, setState] = useState<number | null>(defaultValue ?? null);

  const id = useRef<string>(generateID());

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (disabled || readOnly) return;
      const value = +(e.target as HTMLInputElement).value ?? null;
      setState(value);
      onChange(value);
    },
    [onChange, disabled, readOnly]
  );

  const rates: number[] = [];

  const rootClasses = [classes["root"]];

  for (let i = min ?? 0; i <= (max ?? 0); i++) {
    rates.push(i);
  }

  return (
    <form
      action="#"
      method="post"
      className={rootClasses.join(" ")}
      onInput={handleInput}
    >
      <fieldset disabled={disabled}>
        {rates.map((i) => (
          <label key={i} aria-selected={i === state}>
            <input
              readOnly={readOnly}
              disabled={disabled}
              value={i}
              type="radio"
              aria-labelledby={id.current}
              name={id.current + "_" + i}
            ></input>
            <span id={id.current}>{i + 1} étoile(s)</span>
            <MdStar></MdStar>
          </label>
        ))}
      </fieldset>
      {output && (
        <output name="result">
          {state ?? 0}/{10}
        </output>
      )}
    </form>
  );
};

export default memo(Rating);
