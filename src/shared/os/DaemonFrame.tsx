import {FC} from "react";
import {useSelector} from "../../hooks/Store";
import Daemon from "./Daemon";

const DaemonFrame: FC = () => {
  const instances = useSelector((store) => store.applications.instances);

  return <>
    {Object.keys(instances)
      .filter((key) => instances[key].type === "daemon")
      .map((key) => (
        <Daemon pid={key} key={instances[key].pid}></Daemon>
      ))}
  </>;
};

export default DaemonFrame;
