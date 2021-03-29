import { createContext, useContext, useState } from "react";
import InstalledApplication from "../shared/classes/InstalledApplication";

type InstalledApplicationsStateType = InstalledApplication[];

type InstalledApplicationsContextType = {
  installedApplications: InstalledApplication[];
  setInstalledApplications: React.Dispatch<
    React.SetStateAction<InstalledApplicationsStateType>
  >;
};

const installedAppliationsContex = createContext<InstalledApplicationsContextType>(
  { installedApplications: [], setInstalledApplications: () => {} }
);
const useInstalledApplications = () => useContext(installedAppliationsContex);

const InstalledApplications: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<InstalledApplicationsStateType>([]);
  return (
    <installedAppliationsContex.Provider
      value={{
        installedApplications: state,
        setInstalledApplications: setState
      }}
    >
      {children}
    </installedAppliationsContex.Provider>
  );
};

export { useInstalledApplications };
export default InstalledApplications;
