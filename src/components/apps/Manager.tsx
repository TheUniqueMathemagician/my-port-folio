import { memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../hooks/Store";
import { closeApplication, sendToFront } from "../../store/reducers/Instances";
import { DaemonInstance, WindowInstance } from "../../store/reducers/Instances";
import { MdCenterFocusStrong, MdDelete } from "react-icons/md";
import { setRunOnStartup } from "../../store/reducers/Applications";

import Typography from "../UI/Typography";
import Paper from "../UI/Paper";
import TabPanel from "../UI/TabPanel";
import Tab from "../UI/Tab";
import Tabs from "../UI/Tabs";

import classes from "./Manager.module.scss";
import Table from "../UI/Table";
import TableHead from "../UI/TableHead";
import TableRow from "../UI/TableRow";
import TableCell from "../UI/TableCell";
import TableBody from "../UI/TableBody";
import Checkbox from "../UI/Checkbox";
import TableFoot from "../UI/TableFoot";
import { EColorScheme } from "../../types/EColorScheme";
import ButtonGroup from "../UI/ButtonGroup";
import Button from "../UI/Button";

const Manager = () => {
  const applications = useSelector((store) => store.applications);
  const instances = useSelector(
    (store) => store.instances.elements,
    (left, right) => {
      for (const key in left) {
        const leftItem = left[key];
        const rightItem = right[key];
        if (!leftItem) return false;
        if (!rightItem) return false;
        if (leftItem.displayName !== rightItem.displayName) return false;
      }
      if (Object.keys(left).length !== Object.keys(right).length) return false;
      return true;
    }
  );
  const contrast = useSelector(
    (store) => store.theme.colorScheme === EColorScheme.contrast
  );

  const [panelIndex, setPanelIndex] = useState(0);

  const dispatch = useDispatch();

  const closeInstance = useCallback(
    (app: DaemonInstance | WindowInstance) => {
      dispatch(closeApplication(app));
    },
    [dispatch]
  );

  return (
    <div className={classes["root"]}>
      <Tabs
        direction="right"
        defaultValue={0}
        onChange={(v: number) => setPanelIndex(v)}
      >
        <Tab label="Applications" active={panelIndex === 0} value={0} />
        <Tab label="Instances" active={panelIndex === 1} value={1} />
      </Tabs>
      <TabPanel index={0} value={panelIndex} spaced>
        <Typography variant="h3">Applications</Typography>
        <Paper outlined spaced>
          <Typography variant="h4">Applications installées</Typography>
          <Table aria-label="Applications" size="sm" outlined={contrast}>
            <TableHead>
              <TableRow>
                <TableCell heading>Nom</TableCell>
                <TableCell heading align="center">
                  AID
                </TableCell>
                <TableCell heading align="center">
                  Startup
                </TableCell>
                <TableCell heading align="center">
                  Fenêtré
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(applications).map((key) => (
                <TableRow key={key}>
                  <TableCell>{applications[key].displayName}</TableCell>
                  <TableCell align="center">{applications[key].id}</TableCell>
                  <TableCell align="center">
                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                      <Checkbox
                        color="primary"
                        checked={applications[key].runOnStartup}
                        onChange={(e) => {
                          dispatch(
                            setRunOnStartup({
                              application: applications[key],
                              runOnStartup: e.target.checked
                            })
                          );
                        }}
                      ></Checkbox>
                    </form>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body">
                      {applications[key].type === "window" ? "Oui" : "Non"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFoot>
              <TableRow>
                <TableCell heading>Nom</TableCell>
                <TableCell heading align="center">
                  AID
                </TableCell>
                <TableCell heading align="center">
                  Startup
                </TableCell>
                <TableCell heading align="center">
                  Fenêtré
                </TableCell>
              </TableRow>
            </TableFoot>
          </Table>
        </Paper>
      </TabPanel>
      <TabPanel index={1} value={panelIndex} spaced>
        <Typography variant="h3">Instances</Typography>
        <Paper outlined spaced>
          <Typography variant="h4">Instances actives</Typography>
          <Table outlined={contrast} size="sm">
            <TableHead>
              <TableRow>
                <TableCell heading>Nom</TableCell>
                <TableCell heading align="center">
                  PID
                </TableCell>
                <TableCell heading align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(instances).map((key) => (
                <TableRow key={key}>
                  <TableCell>{instances[key].displayName}</TableCell>
                  <TableCell align="center">{instances[key].id}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        isIcon
                        size="md"
                        onClick={() => {
                          closeInstance(instances[key]);
                        }}
                      >
                        <MdDelete></MdDelete>
                      </Button>
                      {instances[key].type === "window" && (
                        <Button
                          isIcon
                          size="md"
                          onClick={() => {
                            const instance = instances[key];
                            if (instance.type === "window") {
                              dispatch(sendToFront(instance));
                            }
                          }}
                        >
                          <MdCenterFocusStrong color="primary"></MdCenterFocusStrong>
                        </Button>
                      )}
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </TabPanel>
    </div>
  );
};

export default memo(Manager);
