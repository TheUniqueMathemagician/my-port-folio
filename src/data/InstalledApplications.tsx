import { createContext, useContext, useState } from "react";
import InstalledApplication from "../shared/classes/InstalledApplication";

type InstalledApplicationsStateType = InstalledApplication[];

type InstalledApplicationsContextType = [
  InstalledApplication[],
  React.Dispatch<React.SetStateAction<InstalledApplicationsStateType>>
];

const installedAppliationsContex = createContext<InstalledApplicationsContextType>(
  [[], () => {}]
);
const useInstalledApplications = () => useContext(installedAppliationsContex);

const InstalledApplications: React.FunctionComponent = ({ children }) => {
  const [state, setState] = useState<InstalledApplicationsStateType>([]);
  return (
    <installedAppliationsContex.Provider value={[state, setState]}>
      {children}
    </installedAppliationsContex.Provider>
  );
};

export { useInstalledApplications };
export default InstalledApplications;
