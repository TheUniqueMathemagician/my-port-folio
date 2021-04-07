import generateID from "../../functions/generateID";
import DaemonApplication from "./DaemonApplication";
import DaemonInstance from "./DaemonInstance";
import WindowApplication from "./WindowApplication";
import WindowInstance from "./WindowInstance";

type Applications = Array<DaemonApplication | WindowApplication>;
type Instances = Array<DaemonInstance | WindowInstance>;

type ApplicationUpdater = React.Dispatch<React.SetStateAction<Applications>>;
type InstanceUpdater = React.Dispatch<React.SetStateAction<Instances>>;

/**
 * Represents an application
 */
export default abstract class Application {
  private static m_applicationsUpdater: ApplicationUpdater = () => {};
  private static m_instancesUpdater: InstanceUpdater = () => {};
  public readonly id = generateID();

  constructor(
    public readonly displayName: string,
    public readonly icon: string,
    public readonly shortcut: string,
    public readonly runOnStartup: boolean
  ) {}

  public get applicationsUpdater(): ApplicationUpdater {
    return Application.m_applicationsUpdater;
  }

  public get instancesUpdater(): InstanceUpdater {
    return Application.m_instancesUpdater;
  }

  public static set applicationsUpdater(
    applicationUpdater: ApplicationUpdater
  ) {
    Application.m_applicationsUpdater = applicationUpdater;
  }

  public static set instancesUpdater(instanceUpdater: InstanceUpdater) {
    Application.m_instancesUpdater = instanceUpdater;
  }
}
