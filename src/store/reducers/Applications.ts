import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FunctionComponent } from "react";
import About from "../../components/apps/About";
import Contact from "../../components/apps/Contact";
import Education from "../../components/apps/Education";
import Experience from "../../components/apps/Experience";
import Manager from "../../components/apps/Manager";
import Settings from "../../components/apps/Settings";
import Snake from "../../components/apps/Snake";
import Welcome from "../../components/apps/Welcome";
import generateID from "../../functions/generateID";
import IDimensions from "../../types/IDimensions";
import IPosition from "../../types/IPosition";

export enum EApplications {
  About,
  Contact,
  Education,
  Experience,
  Manager,
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

const initialState: {
  [aid: string]: DaemonApplication | WindowApplication;
} = {};
let aid = "";

aid = generateID();
initialState[aid] = {
  component: EApplications.Settings,
  dimensions: { height: 600, width: 600 },
  displayName: "Préférences du système",
  icon: "",
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

aid = generateID();
initialState[aid] = {
  component: EApplications.Manager,
  dimensions: { height: 600, width: 600 },
  displayName: "Gestionnaire d'applications",
  icon: require("../../assets/images/applications/about.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.About,
  dimensions: { height: 600, width: 600 },
  displayName: "A Propos",
  icon: require("../../assets/images/applications/about.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/about.svg").default,
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.Contact,
  dimensions: { height: 600, width: 600 },
  displayName: "Contact",
  icon: require("../../assets/images/applications/contact.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/contact.svg").default,
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.Education,
  dimensions: { height: 600, width: 600 },
  displayName: "Diplômes et formations",
  icon: require("../../assets/images/applications/education.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/education.svg").default,
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.Experience,
  dimensions: { height: 600, width: 600 },
  displayName: "Expériences",
  icon: require("../../assets/images/applications/experience.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/experience.svg").default,
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.Snake,
  dimensions: { height: 600, width: 600 },
  displayName: "le Serpent",
  icon: require("../../assets/images/applications/snake.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../assets/images/applications/snake.svg").default,
  type: "window"
};
aid = generateID();
initialState[aid] = {
  component: EApplications.Welcome,
  dimensions: { height: 600, width: 600 },
  displayName: "Bienvenue",
  icon: require("../../assets/images/applications/welcome.svg").default,
  id: aid,
  maxDimensions: { height: null, width: null },
  minDimensions: { height: null, width: null },
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: true,
  shortcut: "",
  type: "window"
};

export const applicationsMap = new Map<EApplications, FunctionComponent>([
  [EApplications.About, About],
  [EApplications.Contact, Contact],
  [EApplications.Education, Education],
  [EApplications.Experience, Experience],
  [EApplications.Manager, Manager],
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
        application: Application;
        runOnStartup: boolean;
      }>
    ) {
      const application = state[action.payload.application.id];
      application.runOnStartup = action.payload.runOnStartup;
    }
  }
});

const { setRunOnStartup } = applicationsSlice.actions;

export { setRunOnStartup };
export default applicationsSlice.reducer;
