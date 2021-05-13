import { FunctionComponent, memo, useCallback, useRef, useState } from "react";

import classes from "./TextArea.module.scss";

interface IProps {
  defaultValue?: string;
  autoResize?: boolean;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const TextArea: FunctionComponent<IProps> = (props) => {
  const { autoResize, defaultValue, onChange } = props;

  const [value, setValue] = useState<string>(defaultValue ?? "");

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (autoResize) {
        e.target.style.height = `${e.target.scrollHeight + 2}px`;
      }
      onChange(e);
    },
    [autoResize, onChange]
  );

  const rootClasses = [classes["root"]];

  if (autoResize) rootClasses.push(classes["auto-resize"]);

  return (
    <textarea className={rootClasses.join(" ")} onChange={changeHandler}>
      {value}
    </textarea>
  );
};

export default memo(TextArea);
