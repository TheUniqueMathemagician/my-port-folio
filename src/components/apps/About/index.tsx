import { FunctionComponent, memo, useCallback, useState } from "react";
import { EColorScheme } from "../../../types/EColorScheme";
import { useDispatch, useSelector } from "../../../hooks/Store";

import classes from "./index.module.scss";

import Tab from "../../UI/Tab";
import Tabs from "../../UI/Tabs";
import TabPanel from "../../UI/TabPanel";

import Intro from "./Elements/Intro";
import Skills from "./Elements/Skills";
import Hobbies from "./Elements/Hobbies";
import Button from "../../UI/Input/Button";
import { runApplication } from "../../../store/slices/Applications";
import {
  Applications,
  WindowInstance
} from "../../../store/slices/Applications/Types";

import { MdSend } from "react-icons/md";
import { EBreakpoints } from "../../../types/EBreakpoints";

interface IProps {
  pid: string;
}

enum ETabs {
  about,
  skills,
  hobbies
}

const Send = memo(MdSend);

const About: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const [panelIndex, setPanelIndex] = useState<number>(0);

  const dispatch = useDispatch();

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );
  const resizing = useSelector(
    (store) => store.applications.instances[pid] as WindowInstance
  ).resizing;
  const small = useSelector((store) => {
    const instance = store.applications.instances[pid] as WindowInstance;
    if (instance.breakpoint === EBreakpoints.sm) return true;
    if (instance.breakpoint === EBreakpoints.xs) return true;
    return false;
  });

  const handleContactClick = useCallback(() => {
    dispatch(runApplication({ aid: Applications.Contact, args: {} }));
  }, [dispatch]);

  const leftBarClasses = [classes["left-bar"]];
  const rootClasses = [classes["root"]];

  if (contrast) leftBarClasses.push(classes["contrast"]);
  if (small) rootClasses.push(classes["small"]);

  return (
    <div className={rootClasses.join(" ")}>
      <div className={leftBarClasses.join(" ")}>
        <Tabs
          direction={small ? "top" : "right"}
          defaultValue={0}
          onChange={(v: number) => setPanelIndex(v)}
          shouldRefresh={resizing}
        >
          <Tab
            active={panelIndex === ETabs.about}
            label="Profil"
            value={ETabs.about}
          />
          <Tab
            active={panelIndex === ETabs.skills}
            label="Compétences"
            value={ETabs.skills}
          />
          <Tab
            label="Loisirs"
            active={panelIndex === ETabs.hobbies}
            value={ETabs.hobbies}
          />
        </Tabs>
        {!small && (
          <Button
            focusable
            fullWidth
            startIcon
            color="primary"
            onClick={handleContactClick}
          >
            <Send></Send>
            <span>Contacter</span>
          </Button>
        )}
      </div>
      <TabPanel
        className={classes["tab-panel"]}
        index={ETabs.about}
        value={panelIndex}
        spaced
      >
        <Intro pid={pid}></Intro>
      </TabPanel>
      <TabPanel
        className={classes["tab-panel"]}
        index={ETabs.skills}
        value={panelIndex}
        spaced
      >
        <Skills pid={pid}></Skills>
      </TabPanel>
      <TabPanel
        className={classes["tab-panel"]}
        index={ETabs.hobbies}
        value={panelIndex}
        spaced
      >
        <Hobbies pid={pid}></Hobbies>
      </TabPanel>
    </div>
  );
};

export default memo(About);
