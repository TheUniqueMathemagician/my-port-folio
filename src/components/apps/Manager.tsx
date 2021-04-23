import { memo, useCallback, useState } from "react";
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
  Tabs
} from "@material-ui/core";

import { setRunOnStartup } from "../../store/reducers/Applications";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: "100%"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  box: {
    display: "grid",
    rowGap: "1rem",
    gridTemplateColumns: "1fr"
  }
}));

interface TabPanelProps {
  children?: React.ReactNode;
  className?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const classes = useStyles();
  const { className, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className={className}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.box}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

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
  const classes = useStyles();

  const [panelIndex, setPanelIndex] = useState(0);

  const dispatch = useDispatch();

  const closeInstance = useCallback(
    (app: DaemonInstance | WindowInstance) => {
      dispatch(closeApplication(app));
    },
    [dispatch]
  );

  return (
    <div className={classes.root}>
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={panelIndex}
        onChange={(_, v) => setPanelIndex(v)}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Applications" {...a11yProps(0)} />
        <Tab label="Instances" {...a11yProps(1)} />
      </Tabs>
      <TabPanel index={0} value={panelIndex}>
        <Typography variant="h4">Applications</Typography>
        <Typography variant="body1">Applications installées</Typography>
        <TableContainer component={Paper} square variant="outlined">
          <Table aria-label="simple table" size="small">
            <TableHead style={{ background: "#333" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  AID
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Startup
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(applications)
                .filter((key) => applications[key].type === "window")
                .map((key) => (
                  <TableRow key={key}>
                    <TableCell>{applications[key].displayName}</TableCell>
                    <TableCell align="center">{applications[key].id}</TableCell>
                    <TableCell align="center">
                      <form action="#" onSubmit={(e) => e.preventDefault()}>
                        <Checkbox
                          color="primary"
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
                        ></Checkbox>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body1">Services installés</Typography>
        <TableContainer component={Paper} square variant="outlined">
          <Table aria-label="simple table" size="small">
            <TableHead style={{ background: "#333" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  AID
                </TableCell>
                <TableCell style={{ color: "white" }} align="center">
                  Startup
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(applications)
                .filter((key) => applications[key].type === "daemon")
                .map((key) => (
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
        <Typography variant="h4">Instances</Typography>
        <Typography variant="body1">Instances actives</Typography>
        <TableContainer
          component={Paper}
          square
          variant="outlined"
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
    </div>
  );
};

export default memo(Manager);
