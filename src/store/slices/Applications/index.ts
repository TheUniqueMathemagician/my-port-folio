import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IdomPosition } from "../../../types/IdomPosition";

import {
  DaemonApplication,
  DaemonInstance,
  Applications,
  WindowApplication,
  WindowInstance
} from "./Types";
import {
  defaultDimensions,
  defaultMaxDimensions,
  defaultMinDimensions
} from "./Constants";
import generateID from "../../../functions/generateID";
import { ESnap } from "../../../types/ESnap";
import { EResize } from "../../../types/EResize";
import { IDimensions } from "../../../types/IDimensions";
import { IPosition } from "../../../types/IPosition";
import { EBreakpoints } from "../../../types/EBreakpoints";

interface State {
  pool: {
    [aid: number]: DaemonApplication | WindowApplication;
  };
  instances: {
    [pid: string]: DaemonInstance | WindowInstance;
  };
  dragging: boolean;
  resizing: boolean;
  snapShadow: {
    position: IdomPosition;
    visible: boolean;
  };
  zIndexes: string[];
}

let initialState: State = {
  pool: {},
  instances: {},
  dragging: false,
  resizing: false,
  snapShadow: {
    position: { bottom: null, left: null, right: null, top: null },
    visible: false
  },
  zIndexes: []
};

initialState.pool[Applications.About] = {
  aid: Applications.About,
  dimensions: defaultDimensions,
  displayName: "A Propos",
  icon: require("../../../assets/images/applications/about.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../../assets/images/applications/about.svg").default,
  type: "window"
};

initialState.pool[Applications.Contact] = {
  aid: Applications.Contact,
  dimensions: { height: 600, width: 600 },
  displayName: "Contact",
  icon: require("../../../assets/images/applications/contact.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../../assets/images/applications/contact.svg").default,
  type: "window"
};

initialState.pool[Applications.Image] = {
  aid: Applications.Image,
  dimensions: defaultDimensions,
  displayName: "Image",
  icon: "",
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

initialState.pool[Applications.Manager] = {
  aid: Applications.Manager,
  dimensions: defaultDimensions,
  displayName: "Gestionnaire d'applications",
  icon: require("../../../assets/images/applications/manager.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

initialState.pool[Applications.Maps] = {
  aid: Applications.Maps,
  dimensions: defaultDimensions,
  displayName: "Maps",
  icon: "",
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

initialState.pool[Applications.NightWatcher] = {
  aid: Applications.NightWatcher,
  displayName: "NightWatcher",
  icon: require("../../../assets/images/applications/nightwatcher.svg").default,
  runOnStartup: true,
  shortcut: "",
  type: "daemon"
};

initialState.pool[Applications.Projects] = {
  aid: Applications.Projects,
  dimensions: defaultDimensions,
  displayName: "Projets",
  icon: require("../../../assets/images/applications/projects.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: require("../../../assets/images/applications/projects.svg").default,
  type: "window"
};

initialState.pool[Applications.Randit] = {
  aid: Applications.Randit,
  dimensions: defaultDimensions,
  displayName: "Randit",
  icon: "",
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

initialState.pool[Applications.Settings] = {
  aid: Applications.Settings,
  dimensions: defaultDimensions,
  displayName: "Pr??f??rences du syst??me",
  icon: require("../../../assets/images/applications/settings.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  type: "window"
};

initialState.pool[Applications.Snake] = {
  aid: Applications.Snake,
  dimensions: { height: 600, width: 600 },
  displayName: "le Serpent",
  icon: require("../../../assets/images/applications/snake.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: true,
  runOnStartup: false,
  shortcut: "",
  // shortcut: require("../../../assets/images/applications/snake.svg").default,
  type: "window"
};

initialState.pool[Applications.Welcome] = {
  aid: Applications.Welcome,
  dimensions: { height: 400, width: 400 },
  displayName: "Bienvenue",
  icon: require("../../../assets/images/applications/welcome.svg").default,
  maxDimensions: defaultMaxDimensions,
  minDimensions: defaultMinDimensions,
  position: { bottom: null, left: null, right: null, top: null },
  resizable: false,
  runOnStartup: true,
  shortcut: "",
  type: "window"
};

export const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setRunOnStartup(
      state,
      action: PayloadAction<{
        aid: Applications;
        runOnStartup: boolean;
      }>
    ) {
      const application = state.pool[action.payload.aid];
      application.runOnStartup = action.payload.runOnStartup;
    },
    closeApplication(state, action: PayloadAction<{ pid: string }>) {
      if (!state.instances[action.payload.pid]) return;
      delete state.instances[action.payload.pid];
      state.zIndexes = state.zIndexes.filter(
        (zIndex) => zIndex !== action.payload.pid
      );
    },
    runApplication(
      state,
      action: PayloadAction<{
        aid: number;
        args: { [key: string]: string };
      }>
    ) {
      const application = state.pool[action.payload.aid];

      if (!application) return;

      const pid = generateID();

      switch (application.type) {
        case "daemon":
          state.instances[pid] = {
            args: action.payload.args,
            component: application.aid,
            icon: application.icon,
            displayName: application.displayName,
            pid,
            type: application.type
          };
          break;
        case "window":
          state.instances[pid] = {
            args: action.payload.args,
            breakpoint: EBreakpoints.xs,
            component: application.aid,
            icon: application.icon,
            displayName: application.displayName,
            position: application.position,
            dimensions: application.dimensions,
            maxDimensions: application.maxDimensions,
            minDimensions: application.minDimensions,
            pid,
            resizable: application.resizable,
            resizeMode: EResize.none,
            resizing: false,
            dragging: false,
            minimized: false,
            maximized: ESnap.none,
            type: "window"
          };
          state.zIndexes.push(pid);
          break;
        default:
          break;
      }
    },
    sendToFront(state, action: PayloadAction<{ pid: string }>) {
      const instanceIndex = state.zIndexes.findIndex(
        (zIndex) => zIndex === action.payload.pid
      );
      state.zIndexes.splice(instanceIndex, 1);
      state.zIndexes.push(action.payload.pid);
    },
    setBreakpoint(
      state,
      action: PayloadAction<{ pid: string; breakpoint: EBreakpoints }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).breakpoint = action.payload.breakpoint;
    },
    setDimensions(
      state,
      action: PayloadAction<{ pid: string; dimensions: IDimensions }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).dimensions = action.payload.dimensions;
    },
    setDragging(
      state,
      action: PayloadAction<{ pid: string; dragging: boolean }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).dragging = action.payload.dragging;
      state.dragging = action.payload.dragging;
    },
    setPosition(
      state,
      action: PayloadAction<{ pid: string; position: IPosition }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).position = action.payload.position;
    },
    setMaximized(
      state,
      action: PayloadAction<{ pid: string; maximized: ESnap }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).maximized = action.payload.maximized;
    },
    setMinimized(
      state,
      action: PayloadAction<{ pid: string; minimized: boolean }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).minimized = action.payload.minimized;
    },
    setResizeMode(
      state,
      action: PayloadAction<{ pid: string; resizeMode: EResize }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).resizeMode = action.payload.resizeMode;
    },
    setResizing(
      state,
      action: PayloadAction<{ pid: string; resizing: boolean }>
    ) {
      const instance = state.instances[action.payload.pid];
      (instance as WindowInstance).resizing = action.payload.resizing;
      state.resizing = action.payload.resizing;
    },
    setSnapShadowVisibility(state, action: PayloadAction<boolean>) {
      state.snapShadow.visible = action.payload;
    },
    setSnapShadowPosition(state, action: PayloadAction<IdomPosition>) {
      state.snapShadow.position = action.payload;
    }
  }
});

export const {
  setRunOnStartup,
  closeApplication,
  runApplication,
  sendToFront,
  setBreakpoint,
  setDimensions,
  setDragging,
  setPosition,
  setMaximized,
  setMinimized,
  setResizeMode,
  setResizing,
  setSnapShadowPosition,
  setSnapShadowVisibility
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
