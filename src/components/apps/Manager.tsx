import { FunctionComponent, memo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "../../hooks/Store";
import { closeApplication, sendToFront } from "../../store/reducers/Instances";
import { DaemonInstance, WindowInstance } from "../../store/reducers/Instances";
import { MdCenterFocusStrong, MdDelete } from "react-icons/md";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  Checkbox,
  Button,
  ButtonGroup,
  Tab,
  Typography,
  Box,
  Theme,
  makeStyles,
  useTheme,
  Tabs,
  AppBar
} from "@material-ui/core";
import { setRunOnStartup } from "../../store/reducers/Applications";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

interface IProps {}

const Manager: FunctionComponent<IProps> = () => {
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
        if (Object.keys(left).length !== Object.keys(right).length)
          return false;
      }
      return true;
    }
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
    <section>
      <Tabs
        value={panelIndex}
        onChange={() => false}
        aria-label="simple tabs example"
        indicatorColor="primary"
        textColor="primary"
        centered
        variant="fullWidth"
        style={{ backgroundColor: "#ffffffaa" }}
      >
        <Tab label="Applications" onClick={() => setPanelIndex(0)} />
        <Tab label="Instances" onClick={() => setPanelIndex(1)} />
      </Tabs>
      <TabPanel index={0} value={panelIndex}>
        <h2>Applications</h2>
        <TableContainer
          component={Paper}
          square
          style={{ backgroundColor: "#ffffffaa" }}
        >
          <Table aria-label="simple table" size="small">
            <TableHead style={{ background: "#333" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  PID
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Startup
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
                        checked={applications[key].runOnStartup}
                        onChange={(_, value) => {
                          dispatch(
                            setRunOnStartup({
                              application: applications[key],
                              runOnStartup: value
                            })
                          );
                        }}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        color="primary"
                      ></Checkbox>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel index={1} value={panelIndex}>
        <h2>Instances</h2>
        <TableContainer
          component={Paper}
          square
          style={{ backgroundColor: "#ffffffaa" }}
        >
          <Table size="small">
            <TableHead style={{ background: "#333" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  PID
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
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
                    <ButtonGroup disableElevation variant="outlined">
                      <Button
                        size="large"
                        onClick={() => {
                          closeInstance(instances[key]);
                        }}
                      >
                        <MdDelete></MdDelete>
                      </Button>
                      {instances[key].type === "window" && (
                        <Button
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
        </TableContainer>
      </TabPanel>
    </section>
  );
};

export default memo(Manager);
