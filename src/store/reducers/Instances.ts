import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generateID from "../../functions/generateID";
import { EResize } from "../../types/EResize";
import { ESnap } from "../../types/ESnap";
import { IDimensions } from "../../types/IDimensions";
import { IdomPosition } from "../../types/IdomPosition";
import { IPosition } from "../../types/IPosition";
import {
  DaemonApplication,
  EApplications,
  WindowApplication
} from "./Applications";

export interface Instance {
  readonly id: string;
  readonly icon: string;
  readonly displayName: string;
  readonly args: { [key: string]: string };
}

export interface DaemonInstance extends Instance {
  type: "daemon";
}

export interface WindowInstance extends Instance {
  position: IPosition;
  dimensions: IDimensions;
  minDimensions: IDimensions;
  maxDimensions: IDimensions;
  resizable: boolean;
  resizeMode: EResize;
  resizing: boolean;
  dragging: boolean;
  minimized: boolean;
  maximized: ESnap;
  component: EApplications;
  type: "window";
}

interface IState {
  elements: {
    [pid: string]: DaemonInstance | WindowInstance;
  };
  snapShadow: { position: IdomPosition; visible: boolean };
  zIndexes: Array<string>;
}

const initialState: IState = {
  elements: {},
  snapShadow: {
    position: { bottom: 0, left: 0, right: 0, top: 0 },
    visible: false
  },
  zIndexes: []
};

for (const element in initialState.elements) {
  initialState.zIndexes.push(element);
}

export const instancesSlice = createSlice({
  name: "instances",
  initialState,
  reducers: {
    closeApplication(
      state,
      action: PayloadAction<DaemonInstance | WindowInstance>
    ) {
      delete state.elements[action.payload.id];
      state.zIndexes = state.zIndexes.filter(
        (zIndex) => zIndex !== action.payload.id
      );
    },
    runApplication(
      state,
      action: PayloadAction<{
        application: DaemonApplication | WindowApplication;
        args: { [key: string]: string };
      }>
    ) {
      const id = generateID();
      switch (action.payload.application.type) {
        case "daemon":
          state.elements[id] = {
            id,
            args: action.payload.args,
            icon: action.payload.application.icon,
            displayName: action.payload.application.displayName,
            type: "daemon"
          };
          break;
        case "window":
          state.elements[id] = {
            args: action.payload.args,
            id,
            icon: action.payload.application.icon,
            displayName: action.payload.application.displayName,
            position: action.payload.application.position,
            dimensions: action.payload.application.dimensions,
            maxDimensions: action.payload.application.maxDimensions,
            minDimensions: action.payload.application.minDimensions,
            resizable: action.payload.application.resizable,
            resizeMode: EResize.none,
            resizing: false,
            dragging: false,
            minimized: false,
            maximized: ESnap.none,
            component: action.payload.application.component,
            type: "window"
          };
          state.zIndexes.push(id);
          break;
        default:
          break;
      }
    },
    sendToFront(state, action: PayloadAction<WindowInstance>) {
      const instanceIndex = state.zIndexes.findIndex(
        (zIndex) => zIndex === action.payload.id
      );
      state.zIndexes.splice(instanceIndex, 1);
      state.zIndexes.push(action.payload.id);
    },
    setDimensions(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        dimensions: IDimensions;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).dimensions = action.payload.dimensions;
    },
    setDragging(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        dragging: boolean;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).dragging = action.payload.dragging;
    },
    setPosition(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        position: IPosition;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).position = action.payload.position;
    },
    setMaximized(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        maximized: ESnap;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).maximized = action.payload.maximized;
    },
    setMinimized(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        minimized: boolean;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).minimized = action.payload.minimized;
    },
    setResizeMode(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        resizeMode: EResize;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).resizeMode = action.payload.resizeMode;
    },
    setResizing(
      state,
      action: PayloadAction<{
        application: WindowInstance;
        resizing: boolean;
      }>
    ) {
      const instance = state.elements[action.payload.application.id];
      (instance as WindowInstance).resizing = action.payload.resizing;
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
  closeApplication,
  runApplication,
  sendToFront,
  setDimensions,
  setDragging,
  setPosition,
  setMaximized,
  setMinimized,
  setResizeMode,
  setResizing,
  setSnapShadowPosition,
  setSnapShadowVisibility
} = instancesSlice.actions;

export default instancesSlice.reducer;
