import { createContext, useContext, useEffect, useState } from "react";
import Application from "./classes/Application";
import ApplicationInstance from "./classes/ApplicationInstance";
import DaemonApplication from "./classes/DaemonApplication";
import WindowApplication from "./classes/WindowApplication";

type Applications = Array<DaemonApplication | WindowApplication>;

type ApplicationsContextType = {
  applications: Applications;
  setApplications: React.Dispatch<React.SetStateAction<Applications>>;
};

const ApplicationsContext = createContext<ApplicationsContextType>({
  applications: [],
  setApplications: () => {}
});

const useApplications = () => useContext(ApplicationsContext);

/**
 * Contains either self starting or launched applications
 * @returns Returns a provider for all applications
 */
const ApplicationsProvider: React.FunctionComponent = ({ children }) => {
  const [applications, setApplications] = useState<Applications>([]);

  useEffect(() => {
    Application.applicationsUpdater = setApplications;
    ApplicationInstance.applicationsUpdater = setApplications;
  }, []);

  return (
    <ApplicationsContext.Provider value={{ applications, setApplications }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export { useApplications };
export default ApplicationsProvider;
