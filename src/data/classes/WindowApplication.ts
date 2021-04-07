import IDimensions from "../../types/IDimensions";
import IPosition from "../../types/IPosition";
import Application from "./Application";
import WindowInstance from "./WindowInstance";

/**
 * Represents a running window application
 */
export default class WindowApplication extends Application {
  constructor(
    displayName: string,
    icon: string,
    shortcut: string,
    runOnStartup: boolean,
    public readonly component: React.FunctionComponent,
    public readonly dimensions: IDimensions = { height: 800, width: 600 },
    public readonly minDimensions: IDimensions = { height: 200, width: 320 },
    public readonly maxDimensions: IDimensions = { height: 200, width: 300 },
    // TODO: Change whole position system to use 4 coordinates rather than width & height
    public readonly position: IPosition = {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0
    },
    public readonly resizable: boolean = true
  ) {
    super(displayName, icon, shortcut, runOnStartup);
    if (runOnStartup) this.run();
  }

  run() {
    this.instancesUpdater(([...state]) => [...state, new WindowInstance(this)]);
  }

  uninstall() {
    this.applicationsUpdater((state) => state.filter((app) => app !== this));
  }
}
