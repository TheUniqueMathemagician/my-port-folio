import { useEffect, useState } from "react";
import { useApplications } from "../data/Applications";

import style from "styled-components";

const Style = style.div`
  background-color: #3333337F;
  min-height: 40px;
  display: flex;
  padding: 6px 12px;
  justify-content: space-between;
`;

const Apps = style.div`
  flex-grow:1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Language = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 0.8rem;
  :hover {
    background-color: #ffffff30;
    cursor: default;
  }
  `;

const Time = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
  font-size: 0.8rem;
   :hover {
    background-color: #ffffff30;
    cursor: default;
  }
`;

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());
  const { applications } = useApplications();

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
    .join("/");

  return (
    <Style>
      <Apps>
        {applications
          .filter((application) => application.minimized)
          .map((application) => (
            <div key={application.id}>{application.name}</div>
          ))}
      </Apps>
      <Language className="language">Français</Language>
      <Time>
        <p>{_time}</p>
        <p>{_date}</p>
      </Time>
    </Style>
  );
};

export default TaskBar;
