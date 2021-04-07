import Application from "./Application";
import DaemonInstance from "./DaemonInstance";

export default class DaemonApplication extends Application {
  /**
   *
   */
  constructor(
    displayName: string,
    icon: string,
    shortcut: string,
    runOnStartup: boolean
  ) {
    super(displayName, icon, shortcut, runOnStartup);
    if (runOnStartup) this.run();
  }

  run() {
    this.instancesUpdater((state) => [...state, new DaemonInstance(this)]);
  }

  uninstall() {
    this.applicationsUpdater((state) => state.filter((app) => app !== this));
  }
}
