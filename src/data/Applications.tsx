import {
  createContext,
  Dispatch,
  FunctionComponent,
  useCallback,
  useContext,
  useState
} from "react";

class Application {
  private _id: number;
  private _name: string;
  private _maximized: boolean;
  private _minimized: boolean;
  private _setApplication: Dispatch<React.SetStateAction<State>>;

  constructor(
    name: string,
    setApplications: Dispatch<React.SetStateAction<State>>
  ) {
    this._id = new Date().valueOf();
    this._name = name;
    this._maximized = false;
    this._minimized = false;
    this._setApplication = setApplications;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._setApplication(([...state]) => {
      state[state.findIndex((app) => app === this)]._name = v;
      return state;
    });
  }
  public get minimized(): boolean {
    return this._minimized;
  }
  public set minimized(v: boolean) {
    this._setApplication(([...state]) => {
      state[state.findIndex((app) => app === this)]._minimized = v;
      return state;
    });
  }
  public get maximized(): boolean {
    return this._maximized;
  }
  public set maximized(v: boolean) {
    this._setApplication(([...state]) => {
      state[state.findIndex((app) => app === this)]._maximized = v;
      return state;
    });
  }

  public close(): void {
    this._setApplication((state) => state.filter((app) => app !== this));
  }
}

type State = Application[];

interface ApplicationContextType {
  applications: Application[];
  open: (name: string) => void;
}

const ApplicationsContext = createContext<ApplicationContextType>({
  applications: [],
  open: () => {}
});

const useApplications = () => useContext(ApplicationsContext);

// TODO: try with a class, and pass a render function to new Application()
const Applications: FunctionComponent = ({ children }) => {
  const [applications, setApplications] = useState<State>([]);

  const open = useCallback((name: string) => {
    setApplications((state) => {
      return [...state, new Application(name, setApplications)];
    });
  }, []);

  return (
    <ApplicationsContext.Provider value={{ applications, open }}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export { useApplications, Application, Applications };

export default Applications;
