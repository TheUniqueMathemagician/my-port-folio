import { createElement, FunctionComponent } from "react";
import { useSelector } from "../hooks/Store";
import { applicationsMap } from "../store/slices/Applications/Constants";
import { WindowInstance } from "../store/slices/Applications/Types";

import { EColorScheme } from "../types/EColorScheme";

import classes from "./Activity.module.scss";

import MenuBar from "./MenuBar";

interface IProps {
  pid: string;
}

const Activity: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const zIndexes = useSelector((store) => store.applications.zIndexes);
  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );
  const component = useSelector(
    (store) => (store.applications.instances[pid] as WindowInstance).component
  );

  const args = useSelector(
    (store) => (store.applications.instances[pid] as WindowInstance).args
  );

  const rootClasses = [classes["root"]];
  const zIndex = zIndexes.indexOf(pid);

  if (contrast) rootClasses.push(classes["contrast"]);

  const renderComponent = applicationsMap.get(component);

  return (
    <section style={{ zIndex }} className={rootClasses.join(" ")}>
      <MenuBar pid={pid}></MenuBar>
      {renderComponent
        ? createElement(renderComponent, {
            args,
            pid
          })
        : null}
    </section>
  );
};

export default Activity;
