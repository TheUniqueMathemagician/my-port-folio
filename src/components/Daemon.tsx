import { createElement, FunctionComponent } from "react";
import { useSelector } from "../hooks/Store";
import { applicationsMap } from "../store/slices/Applications/Constants";
import { DaemonInstance } from "../store/slices/Applications/Types";

interface IProps {
  pid: string;
}

const Daemon: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const component = useSelector(
    (store) => (store.applications.instances[pid] as DaemonInstance).component
  );
  const args = useSelector(
    (store) => (store.applications.instances[pid] as DaemonInstance).args
  );

  const renderComponent = applicationsMap.get(component);

  return renderComponent
    ? createElement(renderComponent, {
        args,
        pid
      })
    : null;
};

export default Daemon;
