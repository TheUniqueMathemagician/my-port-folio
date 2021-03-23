import { useEffect, useState } from "react";

import style from "styled-components";

const Style = style.div`
  background-color: #3333337F;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
`;

const Apps = style.div`
  flex-grow:1;
`;

const Language = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 6px 12px;
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
  padding: 6px 12px;
   :hover {
    background-color: #ffffff30;
    cursor: default;
  }
`;

const TaskBar = () => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(Date.now());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Style>
      <Apps></Apps>
      <Language className="language">Français</Language>
      <Time>
        <p>{new Date(date).toLocaleTimeString()}</p>
        <p>{new Date(date).toLocaleDateString()}</p>
      </Time>
    </Style>
  );
};

export default TaskBar;
