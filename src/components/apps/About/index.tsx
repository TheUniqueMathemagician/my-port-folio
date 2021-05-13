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
import { runApplication } from "../../../store/reducers/Instances";
import { MdSend } from "react-icons/md";

interface IProps {
  pid: string;
}

enum ETabs {
  about,
  hobbies,
  skills
  // TODO: Add projects
}

const Send = memo(() => <MdSend></MdSend>);

const About: FunctionComponent<IProps> = (props) => {
  const { pid } = props;

  const [panelIndex, setPanelIndex] = useState<number>(0);

  const dispatch = useDispatch();

  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const contact = useSelector(
    (store) =>
      store.applications.elements[
        Object.keys(store.applications.elements).find(
          (key) => store.applications.elements[key].displayName === "Contact"
        ) ?? ""
      ]
  );

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (contact) {
        dispatch(runApplication({ application: contact, args: {} }));
      }
    },
    []
  );

  const leftBarClasses = [classes["left-bar"]];

  if (contrast) leftBarClasses.push(classes["contrast"]);

  return (
    <div className={classes["root"]}>
      <div className={leftBarClasses.join(" ")}>
        <Tabs
          direction="right"
          defaultValue={0}
          onChange={(v: number) => setPanelIndex(v)}
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
        <Button
          focusable
          fullWidth
          startIcon
          style={{ height: "3rem" }}
          onClick={handleContactClick}
        >
          <Send></Send>
          <span>Contact</span>
        </Button>
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
