import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const TaskBarTimeDate = () => {
  const [date, setDate] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const _time = new Date(date).toLocaleTimeString().slice(0, -3);

  const _date = new Date(date)
    .toLocaleDateString()
    .split("/")
    .map((x) => x.match(/\d{2}$/))
    .join("-");
  return (
    <div>
      <Typography variant="body1" style={{ color: "white" }}>
        {_time}
      </Typography>
      <Typography variant="body1" style={{ color: "white" }}>
        {_date}
      </Typography>
    </div>
  );
};

export default TaskBarTimeDate;
