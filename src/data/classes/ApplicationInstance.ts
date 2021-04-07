import generateID from "../../functions/generateID";
import DaemonApplication from "./DaemonApplication";
import DaemonInstance from "./DaemonInstance";
import WindowApplication from "./WindowApplication";
import WindowInstance from "./WindowInstance";

type Applications = Array<DaemonApplication | WindowApplication>;
type Instances = Array<DaemonInstance | WindowInstance>;

type ApplicationUpdater = React.Dispatch<React.SetStateAction<Applications>>;
type InstanceUpdater = React.Dispatch<React.SetStateAction<Instances>>;

export default abstract class ApplicationInstance {
  public readonly id = generateID();
  private static m_applicationsUpdater: ApplicationUpdater = () => {};
  private static m_instancesUpdater: InstanceUpdater = () => {};

  close() {
    this.instancesUpdater((state) => state.filter((app) => app !== this));
  }

  public get applicationsUpdater(): ApplicationUpdater {
    return ApplicationInstance.m_applicationsUpdater;
  }

  public get instancesUpdater(): InstanceUpdater {
    return ApplicationInstance.m_instancesUpdater;
  }

  public static set applicationsUpdater(
    applicationUpdater: ApplicationUpdater
  ) {
    ApplicationInstance.m_applicationsUpdater = applicationUpdater;
  }

  public static set instancesUpdater(instanceUpdater: InstanceUpdater) {
    ApplicationInstance.m_instancesUpdater = instanceUpdater;
  }
}
