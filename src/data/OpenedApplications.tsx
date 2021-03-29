import { createContext, useContext, useState } from "react";
import OpenedApplication from "../shared/classes/OpenedApplication";

type OpenedApplicationsStateType = OpenedApplication[];

type OpenedApplicationsContextType = {
  openedApplications: OpenedApplication[];
  setOpenedApplications: React.Dispatch<
    React.SetStateAction<OpenedApplicationsStateType>
  >;
};

const openedAppliationsContex = createContext<OpenedApplicationsContextType>({
  openedApplications: [],
  setOpenedApplications: () => {}
});
const useOpenedApplications = () => useContext(openedAppliationsContex);

const OpenedAppliations: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<OpenedApplicationsStateType>([]);
  return (
    <openedAppliationsContex.Provider
      value={{ openedApplications: state, setOpenedApplications: setState }}
    >
      {children}
    </openedAppliationsContex.Provider>
  );
};

export { useOpenedApplications };
export default OpenedAppliations;
