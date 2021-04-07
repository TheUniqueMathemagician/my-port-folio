import ApplicationInstance from "./ApplicationInstance";
import DaemonApplication from "./DaemonApplication";

export default class DaemonInstance extends ApplicationInstance {
  /**
   *
   */
  constructor(daemon: DaemonApplication) {
    super(daemon.icon, daemon.displayName);
  }
}
