import { createContext, useContext, useState } from "react";
import Application from "../shared/classes/Application";

type Applications = Application[];

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
  const [state, setState] = useState<Applications>([]);
  return (
    <ApplicationsContext.Provider
      value={{ applications: state, setApplications: setState }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export { useApplications };
export default ApplicationsProvider;
