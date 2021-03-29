import { createContext, useContext, useState } from "react";
import OpenedApplication from "../shared/classes/OpenedApplication";

type OpenedApplicationsStateType = OpenedApplication[];

type OpenedApplicationsContextType = [
  OpenedApplication[],
  React.Dispatch<React.SetStateAction<OpenedApplicationsStateType>>
];

const openedAppliationsContex = createContext<OpenedApplicationsContextType>([
  [],
  () => []
]);
const useOpenedApplications = () => useContext(openedAppliationsContex);

const OpenedAppliations: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<OpenedApplicationsStateType>([]);
  return (
    <openedAppliationsContex.Provider value={[state, setState]}>
      {children}
    </openedAppliationsContex.Provider>
  );
};

export { useOpenedApplications };
export default OpenedAppliations;
