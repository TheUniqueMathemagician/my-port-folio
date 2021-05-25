import classes from "./ActivityFrame.module.scss";
import { FunctionComponent } from "react";
import { useSelector } from "../hooks/Store";
import Activity from "./Activity";

interface IProps {}

const ActivityFrame: FunctionComponent<IProps> = () => {
  const instances = useSelector((store) => store.applications.instances);

  const rootClasses = [classes["root"]];

  return (
    <div className={rootClasses.join(" ")}>
      {Object.keys(instances)
        .filter((key) => instances[key].type === "window")
        .map((key) => (
          <Activity pid={key} key={instances[key].pid}></Activity>
        ))}
    </div>
  );
};

export default ActivityFrame;
