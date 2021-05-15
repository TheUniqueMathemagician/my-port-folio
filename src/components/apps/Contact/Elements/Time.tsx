import classes from "./Time.module.scss";
import { FunctionComponent, memo, useEffect, useState } from "react";
import Typography from "../../../UI/Typography";

interface ITimeProps {
  readonly date: Date;
  readonly onAvailable: () => void;
}

const Time: FunctionComponent<ITimeProps> = (props) => {
  const { date, onAvailable } = props;

  const [time, setTime] = useState<number>(date.getTime() - Date.now());

  useEffect(() => {
    if (time <= 0) onAvailable();
  }, [time, onAvailable]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = date.getTime() - Date.now();
      if (time > 0) {
        setTime(time);
      } else {
        setTime(0);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [date, onAvailable]);

  return time !== null ? (
    <Typography variant="body" className={classes["root"]}>
      {Math.round(time / 1000)}
    </Typography>
  ) : null;
};

export default memo(Time);
