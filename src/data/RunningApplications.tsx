import { createContext, useContext, useState } from "react";
import RunningApplication from "../shared/classes/RunningApplication";

type RunningApplications = RunningApplication[];

type RunningApplicationsContextType = {
  runningApplications: RunningApplications;
  setRunningApplications: React.Dispatch<
    React.SetStateAction<RunningApplications>
  >;
};

const RunningApplicationContext = createContext<RunningApplicationsContextType>(
  {
    runningApplications: [],
    setRunningApplications: () => {}
  }
);
const useRunningApplications = () => useContext(RunningApplicationContext);

/**
 * Contains either windowed or background applications
 * @returns Returns a provider for all running applications
 */
const RunningApplicationsProvider: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<RunningApplications>([]);
  return (
    <RunningApplicationContext.Provider
      value={{ runningApplications: state, setRunningApplications: setState }}
    >
      {children}
    </RunningApplicationContext.Provider>
  );
};

export { useRunningApplications };
export default RunningApplicationsProvider;
