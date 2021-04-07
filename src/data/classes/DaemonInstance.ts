import ApplicationInstance from "./ApplicationInstance";
import DaemonApplication from "./DaemonApplication";

export default class DaemonInstance extends ApplicationInstance {
  /**
   *
   */
  constructor(daemon: DaemonApplication) {
    super();
    console.log(daemon.displayName);
  }
}
