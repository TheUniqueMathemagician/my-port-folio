import { createContext, useContext, useEffect, useState } from "react";
import Application from "./classes/Application";
import ApplicationInstance from "./classes/ApplicationInstance";
import DaemonInstance from "./classes/DaemonInstance";
import WindowInstance from "./classes/WindowInstance";

type Instances = Array<DaemonInstance | WindowInstance>;

type InstancesContextType = {
  instances: Instances;
  setInstances: React.Dispatch<React.SetStateAction<Instances>>;
};

const InstancesContext = createContext<InstancesContextType>({
  instances: [],
  setInstances: () => {}
});

const useInstances = () => useContext(InstancesContext);

/**
 * Contains all running applications instances
 * @returns Returns a provider for all applications instances
 */
const InstancesProvider: React.FunctionComponent = ({ children }) => {
  const [instances, setInstances] = useState<Instances>([]);

  useEffect(() => {
    Application.instancesUpdater = setInstances;
    ApplicationInstance.instancesUpdater = setInstances;
  }, []);

  return (
    <InstancesContext.Provider value={{ instances, setInstances }}>
      {children}
    </InstancesContext.Provider>
  );
};

export { useInstances };
export default InstancesProvider;
