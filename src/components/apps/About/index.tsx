import { FunctionComponent, memo, useState } from "react";
import { EColorScheme } from "../../../types/EColorScheme";
import { useSelector } from "../../../hooks/Store";

import classes from "./index.module.scss";

import Tab from "../../UI/Tab";
import Tabs from "../../UI/Tabs";
import TabPanel from "../../UI/TabPanel";

import Intro from "./Elements/Intro";
import Skills from "./Elements/Skills";
import Hobbies from "./Elements/Hobbies";

interface IProps {
  pid: string;
}

enum ETabs {
  about,
  hobbies,
  skills
  // TODO: Add projects
}

const About: FunctionComponent<IProps> = (props) => {
  const { pid } = props;
  const [panelIndex, setPanelIndex] = useState<number>(0);
  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  return (
    <div className={classes["root"]}>
      <Tabs
        direction="right"
        defaultValue={0}
        onChange={(v: number) => setPanelIndex(v)}
        separator={contrast}
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
