import { memo, useState } from "react";
import {
  // useDispatch,
  useSelector
} from "../../hooks/Store";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Tooltip,
  Typography
} from "@material-ui/core";

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
    rowGap: "1rem"
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

const Settings = () => {
  const classes = useStyles();
  const [panelIndex, setPanelIndex] = useState(0);
  const users = useSelector((store) => store.users.elements);
  const currentUserID = useSelector((store) => store.users.currentUserID);
  // const dispatch = useDispatch();
  // const bg = useSelector((store) => store.theme.workspaceBackgroundURL);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setPanelIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        indicatorColor="primary"
        orientation="vertical"
        variant="scrollable"
        value={panelIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Theme" {...a11yProps(0)} />
        <Tab label="Langue" {...a11yProps(1)} />
        <Tab label="Utilisateurs" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={panelIndex} index={0}>
        <Typography variant="h4" noWrap>
          Préférences du thème
        </Typography>
        <Typography variant="body1">Thème de l'interface</Typography>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend" contentEditable>
            Thème de l'interface
          </FormLabel> */}
          <RadioGroup
            aria-label="thème"
            name="theme"
            value={0}
            onChange={() => {}}
          >
            <FormControlLabel
              value={0}
              control={<Radio color="primary" />}
              label="Clair"
            />
            <Tooltip title="Indisponible" arrow placement="left">
              <FormControlLabel
                value={1}
                control={<Radio color="primary" />}
                label="Foncé"
                disabled
              />
            </Tooltip>
            <Tooltip title="Indisponible" arrow placement="left">
              <FormControlLabel
                value={2}
                control={<Radio color="primary" />}
                color="primary"
                label="Contrasté"
                disabled
              />
            </Tooltip>
          </RadioGroup>
        </FormControl>
        <Typography variant="body1">Fond d'écran principal</Typography>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Fond d'écran principal</FormLabel> */}
          <RadioGroup
            aria-label="fond d'écran"
            name="background-image"
            value={1}
            onChange={() => {}}
          >
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label="Forêt"
            />
            <Tooltip title="Indisponible" arrow placement="left">
              <FormControlLabel
                value={2}
                control={<Radio color="primary" />}
                label="Fleurs"
                disabled
              />
            </Tooltip>
          </RadioGroup>
        </FormControl>
      </TabPanel>
      <TabPanel value={panelIndex} index={1}>
        <Typography variant="h4" noWrap>
          Préférences de la langue
        </Typography>
        <Typography variant="body1">Langue du système</Typography>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Langue</FormLabel> */}
          <RadioGroup
            aria-label="fond d'écran"
            name="background-image"
            value={0}
            onChange={() => {}}
          >
            <FormControlLabel
              value={0}
              control={<Radio color="primary" />}
              label="Français"
            />
            <Tooltip title="Unavailable" arrow placement="left">
              <FormControlLabel
                value={1}
                control={<Radio color="primary" />}
                label="English"
                disabled
              />
            </Tooltip>
            <Tooltip title="Nicht verfügbar" arrow placement="left">
              <FormControlLabel
                value={2}
                control={<Radio color="primary" />}
                label="Deutsch"
                disabled
              />
            </Tooltip>
          </RadioGroup>
        </FormControl>
      </TabPanel>
      <TabPanel value={panelIndex} index={2}>
        <Typography variant="h4" noWrap>
          Utilisateurs
        </Typography>
        <Typography variant="subtitle1">Utilisateur actuel</Typography>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item>
            <Avatar
              alt="Image de profil"
              src={users[currentUserID].profileImage}
            ></Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {users[currentUserID].displayName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button disabled variant="outlined" color="primary">
              Changer le mot de passe
            </Button>
          </Grid>
        </Grid>
        <Typography variant="subtitle1">Utilisateurs</Typography>
        {Object.keys(users).map((key) => {
          return (
            <Grid
              key={key}
              container
              spacing={2}
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <Avatar
                  alt="Image de profil"
                  src={users[key].profileImage}
                ></Avatar>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {users[key].displayName}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </TabPanel>
    </div>
  );
};

export default memo(Settings);
