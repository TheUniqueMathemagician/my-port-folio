import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionComponent } from "react";
import About from "../../components/apps/About";
import Contact from "../../components/apps/Contact";
import Manager from "../../components/apps/Manager";
import Maps from "../../components/apps/Maps";
import Projects from "../../components/apps/Projects";
import Settings from "../../components/apps/Settings";
import Snake from "../../components/apps/Snake";
import Welcome from "../../components/apps/Welcome";
import generateID from "../../functions/generateID";
import { IDimensions } from "../../types/IDimensions";
import { IPosition } from "../../types/IPosition";

export enum EApplications {
  About,
  Contact,
  Manager,
  Maps,
  Projects,
  Settings,
  Snake,
  Welcome
}

export interface Application {
  readonly displayName: string;
  readonly icon: string;
  readonly id: string;
  runOnStartup: boolean;
  readonly shortcut: string;
}

export interface DaemonApplication extends Application {
  readonly type: "daemon";
}

export interface WindowApplication extends Application {
  readonly component: EApplications;
  readonly dimensions: IDimensions;
  readonly maxDimensions: IDimensions;
  readonly minDimensions: IDimensions;
  readonly position: IPosition;
  readonly resizable: boolean;
  readonly type: "window";
}

let initialState: {
  elements: {
    [aid: string]: DaemonApplication | WindowApplication;
  };
} = { elements: {} };
let aid = "";

const defaultDimensions = {
  height: 600,
  width: 800
};
const defaultMaxDimensions = {
  height: 1200,
  width: 1600
};
const defaultMinDimensions = {
  height: 300,
  width: 400
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Settings,
  dimensions: defaultDimensions,
  displayName: "Préférences du système",
  icon: require("../../assets/images/applications/settings.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Manager,
  dimensions: defaultDimensions,
  displayName: "Gestionnaire d'applications",
  icon: require("../../assets/images/applications/about.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Maps,
  dimensions: defaultDimensions,
  displayName: "Maps",
  icon: "",
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.About,
  dimensions: defaultDimensions,
  displayName: "A Propos",
  icon: require("../../assets/images/applications/about.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/about.svg").default,
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Projects,
  dimensions: defaultDimensions,
  displayName: "Projets",
  icon: require("../../assets/images/applications/about.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/about.svg").default,
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Contact,
  dimensions: { height: 600, width: 600 },
  displayName: "Contact",
  icon: require("../../assets/images/applications/contact.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/contact.svg").default,
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Snake,
  dimensions: { height: 600, width: 600 },
  displayName: "le Serpent",
  icon: require("../../assets/images/applications/snake.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  // shortcut: require("../../assets/images/applications/snake.svg").default,
  type: "window"
};

aid = generateID();
initialState.elements[aid] = {
  component: EApplications.Welcome,
  dimensions: { height: 300, width: 300 },
  displayName: "Bienvenue",
  icon: require("../../assets/images/applications/welcome.svg").default,
  id: aid,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: false,
  runOnStartup: true,
  shortcut: "",
  type: "window"
};

export const applicationsMap = new Map<
  EApplications,
  FunctionComponent<{ args: { [key: string]: string }; pid: string }>
>([
  [EApplications.About, About],
  [EApplications.Contact, Contact],
  [EApplications.Manager, Manager],
  [EApplications.Maps, Maps],
  [EApplications.Projects, Projects],
  [EApplications.Settings, Settings],
  [EApplications.Snake, Snake],
  [EApplications.Welcome, Welcome]
]);

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setRunOnStartup(
      state,
      action: PayloadAction<{
        aid: string;
        runOnStartup: boolean;
      }>
    ) {
      const application = state.elements[action.payload.aid];
      application.runOnStartup = action.payload.runOnStartup;
    }
  }
});

export const { setRunOnStartup } = applicationsSlice.actions;

export default applicationsSlice.reducer;
