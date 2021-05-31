import { EBreakpoints } from "../../../types/EBreakpoints";
import { EResize } from "../../../types/EResize";
import { ESnap } from "../../../types/ESnap";
import { IDimensions } from "../../../types/IDimensions";
import { IPosition } from "../../../types/IPosition";

export enum Applications {
  About,
  Contact,
  Image,
  Manager,
  Maps,
  Projects,
  Randit,
  Settings,
  Snake,
  Welcome
}

export interface Application {
  readonly aid: Applications;
  readonly displayName: string;
  readonly icon: string;
  readonly shortcut: string;
  runOnStartup: boolean;
}

export interface DaemonApplication extends Application {
  readonly type: "daemon";
}

export interface WindowApplication extends Application {
  readonly dimensions: IDimensions;
  readonly maxDimensions: IDimensions;
  readonly minDimensions: IDimensions;
  readonly position: IPosition;
  readonly resizable: boolean;
  readonly type: "window";
}

export interface Instance {
  readonly args: { [key: string]: string };
  readonly component: Applications;
  readonly displayName: string;
  readonly icon: string;
  readonly pid: string;
}

export interface DaemonInstance extends Instance {
  type: "daemon";
}

export interface WindowInstance extends Instance {
  breakpoint: EBreakpoints;
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
  type: "window";
}
