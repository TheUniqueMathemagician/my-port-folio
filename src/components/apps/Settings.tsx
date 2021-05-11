import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../hooks/Store";
import { EColorScheme } from "../../types/EColorScheme";
import {
  setBackgroundColor,
  setColorScheme,
  setPrimaryColor
} from "../../store/reducers/Theme";

import Radio from "../UI/Input/Radio";
import Typography from "../UI/Typography";
import Tab from "../UI/Tab";
import TabPanel from "../UI/TabPanel";
import Tabs from "../UI/Tabs";
import RadioGroup from "../UI/Input/RadioGroup";
import Avatar from "../UI/Avatar";
import Container from "../UI/Container";

import classes from "./Settings.module.scss";
import Paper from "../UI/Paper";
import Button from "../UI/Input/Button";

import { MdInfo } from "react-icons/md";

interface IProps {
  pid: string;
  args: { [key: string]: string };
}

const Settings: FunctionComponent<IProps> = (props) => {
  const { args, pid } = props;

  const [panelIndex, setPanelIndex] = useState(
    args["tab"] === "profile" ? 2 : 0
  );

  const dispatch = useDispatch();

  //#region Selectors

  const users = useSelector((store) => store.users.elements);
  const background = useSelector(
    (store) => store.theme.palette.background[store.theme.colorScheme]
  );
  const primary = useSelector(
    (store) => store.theme.palette.primary[store.theme.colorScheme]
  );
  const palette = useSelector((store) => store.theme.palette);
  const colorScheme = useSelector((store) => store.theme.colorScheme);
  const currentUserID = useSelector((store) => store.users.currentUserID);

  //#endregion

  const handleTabChange = useCallback((value: number) => {
    setPanelIndex(value);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    Object.keys(palette).forEach((key) => {
      const value = ((palette as any)[key] as any)[colorScheme];
      root?.style.setProperty(`--cvos-${key}`, value);
      root?.style.setProperty(`--cvos-${key}-20`, `${value}14`);
      root?.style.setProperty(`--cvos-${key}-33`, `${value}55`);
      root?.style.setProperty(`--cvos-${key}-50`, `${value}80`);
      root?.style.setProperty(`--cvos-${key}-67`, `${value}aa`);
    });
  }, [palette, colorScheme]);

  const handleThemeChange = useCallback(
    (v: number) => {
      dispatch(setColorScheme(v));
    },
    [dispatch]
  );

  const handleBackgroundInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setBackgroundColor({
          [EColorScheme.contrast]: e.target.value,
          [EColorScheme.dark]: e.target.value,
          [EColorScheme.default]: e.target.value,
          [EColorScheme.light]: e.target.value
        })
      );
    },
    [dispatch]
  );

  const handleResetBackground = useCallback(() => {
    dispatch(
      setBackgroundColor({
        [EColorScheme.contrast]: "#000000",
        [EColorScheme.dark]: "#333333",
        [EColorScheme.default]: "#cccccc",
        [EColorScheme.light]: "#ffffff"
      })
    );
  }, [dispatch]);

  const handlePrimaryInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setPrimaryColor({
          [EColorScheme.contrast]: e.target.value,
          [EColorScheme.dark]: e.target.value,
          [EColorScheme.default]: e.target.value,
          [EColorScheme.light]: e.target.value
        })
      );
    },
    [dispatch]
  );

  const handleResetPrimary = useCallback(() => {
    dispatch(
      setPrimaryColor({
        [EColorScheme.contrast]: "#ffff00",
        [EColorScheme.dark]: "#4489f8",
        [EColorScheme.default]: "#0075db",
        [EColorScheme.light]: "#0088ff"
      })
    );
  }, [dispatch]);

  const otherUsersKeys = Object.keys(users).filter(
    (key) => key !== users[currentUserID].id
  );

  return (
    <div className={classes["root"]}>
      <Tabs
        defaultValue={panelIndex}
        onChange={handleTabChange}
        direction="right"
        separator={colorScheme === EColorScheme.contrast}
      >
        <Tab label="Theme" value={0} active={panelIndex === 0} />
        <Tab label="Langue" value={1} active={panelIndex === 1} />
        <Tab label="Utilisateurs" value={2} active={panelIndex === 2} />
      </Tabs>
      <TabPanel value={panelIndex} index={0} spaced>
        <Typography variant="h3" noWrap noSelect>
          Préférences du thème
        </Typography>
        <Paper outlined fullWidth spaced blur background="background">
          <Typography variant="h4" noWrap noSelect>
            Thème de l'interface
          </Typography>
          <RadioGroup>
            <Radio
              name={pid + "_theme"}
              label="Défaut"
              value={EColorScheme.default}
              noSelect
              checked={colorScheme === EColorScheme.default}
              onChange={() => dispatch(setColorScheme(EColorScheme.default))}
            ></Radio>
            <Radio
              name={pid + "_theme"}
              label="Clair"
              value={EColorScheme.light}
              noSelect
              checked={colorScheme === EColorScheme.light}
              onChange={() => dispatch(setColorScheme(EColorScheme.light))}
            ></Radio>
            <Radio
              name={pid + "_theme"}
              label="Sombre"
              value={EColorScheme.dark}
              noSelect
              checked={colorScheme === EColorScheme.dark}
              onChange={() => dispatch(setColorScheme(EColorScheme.dark))}
            ></Radio>
            <Radio
              name={pid + "_theme"}
              label="Contrasté"
              value={EColorScheme.contrast}
              noSelect
              checked={colorScheme === EColorScheme.contrast}
              onChange={() => dispatch(setColorScheme(EColorScheme.contrast))}
            ></Radio>
          </RadioGroup>
          <br />
          <div className={classes["flex"]}>
            <Typography variant="body" noSelect color="info">
              <MdInfo></MdInfo>
            </Typography>
            <Typography variant="body" noSelect>
              Le thème contrasté améliore les performances de rendu
            </Typography>
          </div>
        </Paper>
        <br />
        <Paper outlined fullWidth spaced blur background="background">
          <Typography variant="h4" noWrap noSelect>
            Couleur de l'interface
          </Typography>
          <div className={classes["flex"]}>
            <input
              type="color"
              name={pid + "_background"}
              value={background}
              onChange={handleBackgroundInputChange}
            ></input>
            <Button
              color="primary"
              contrast={colorScheme === EColorScheme.contrast}
              focusable
              ripple
              size="md"
              variant="filled"
              onClick={handleResetBackground}
            >
              Par défaut
            </Button>
          </div>
        </Paper>
        <br />
        <Paper outlined fullWidth spaced blur background="background">
          <Typography variant="h4" noWrap noSelect>
            Couleur des éléments interactifs
          </Typography>
          <div className={classes["flex"]}>
            <input
              type="color"
              name={pid + "_primary"}
              value={primary}
              onChange={handlePrimaryInputChange}
            ></input>
            <Button
              color="primary"
              contrast={colorScheme === EColorScheme.contrast}
              focusable
              ripple
              size="md"
              variant="filled"
              onClick={handleResetPrimary}
            >
              Par défaut
            </Button>
          </div>
        </Paper>
      </TabPanel>
      <TabPanel value={panelIndex} index={1} spaced>
        <Typography variant="h3" noWrap noSelect>
          Préférences linguistiques
        </Typography>
        <Paper outlined fullWidth spaced blur background="background">
          <Typography variant="h4" noWrap noSelect>
            Langue du système
          </Typography>
          <RadioGroup
          // onChange={(value) => {
          //   dispatch(setColorScheme(value));
          // }}
          >
            <Radio
              checked={true}
              label="Français"
              name={pid + "_language"}
              noSelect
              value={2}
            ></Radio>
            <Radio
              checked={false}
              disabeld
              label="English"
              name={pid + "_language"}
              noSelect
              value={1}
            ></Radio>
            <Radio
              checked={false}
              disabeld
              label="Deutsch"
              name={pid + "_language"}
              noSelect
              value={2}
            ></Radio>
          </RadioGroup>
        </Paper>
      </TabPanel>
      <TabPanel value={panelIndex} index={2} spaced>
        <Typography variant="h3" noWrap noSelect>
          Préférences utilisateurs
        </Typography>
        <Paper outlined fullWidth spaced blur background="background">
          <Typography variant="h4" noWrap noSelect>
            Utilisateur actuel
          </Typography>
          <Container type="grid" orientation="row" space>
            <Avatar
              alt="Image de profil"
              src={users[currentUserID].profileImage}
            ></Avatar>
            <Typography variant="body" noWrap noSelect>
              {users[currentUserID].displayName}
            </Typography>
          </Container>
          <Typography variant="h4" noWrap noSelect>
            Autres utilisateurs
          </Typography>
          {otherUsersKeys.length > 0 ? (
            otherUsersKeys.map((key) => (
              <div key={key}>
                <Avatar
                  alt="Image de profil"
                  src={users[key].profileImage}
                ></Avatar>
                <Typography variant="body" noWrap noSelect>
                  {users[key].displayName}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="body" noSelect>
              Aucun autre utilisateur
            </Typography>
          )}
        </Paper>
      </TabPanel>
    </div>
  );
};

export default Settings;
