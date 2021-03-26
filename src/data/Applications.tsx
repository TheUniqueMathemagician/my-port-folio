import {
  createContext,
  FunctionComponent,
  useContext,
  useReducer,
  Reducer,
  Dispatch
} from "react";

class Application {
  private _id: number;
  private _name: string;
  private _minimized: boolean;
  private _maximized: boolean;
  private _close: () => void;

  constructor(id: number, name: string, close: () => void) {
    this._id = id;
    this._name = name;
    this._minimized = false;
    this._maximized = false;
    this._close = close;
  }

  public get id(): number {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }
  public get minimized(): boolean {
    return this._minimized;
  }
  public get maximized(): boolean {
    return this._maximized;
  }

  public minimize(): void {
    this._minimized = true;
  }
  public maximize(): void {
    this._maximized = true;
  }
  public unmaximize(): void {
    this._maximized = false;
  }
  public close(): void {
    this._close();
  }
}

enum ActionType {
  Close,
  Open
}

type CloseAction = {
  type: ActionType.Close;
  payload: {
    application: Application;
  };
};

type OpenAction = {
  type: ActionType.Open;
  payload: {
    name: string;
  };
};

type Action = CloseAction | OpenAction;

type State = {
  applications: Application[];
};

type ApplicationContextType = [State, Dispatch<Action>];

const ApplicationsContext = createContext<ApplicationContextType>([
  { applications: [] },
  () => {}
]);

const useApplications = () => useContext(ApplicationsContext);

const Applications: FunctionComponent = ({ children }) => {
  const reducer: Reducer<State, Action> = (state, action) => {
    switch (action.type) {
      case ActionType.Open:
        const id = new Date().valueOf();
        state.applications = [
          ...state.applications,
          new Application(id, action.payload.name, () => {
            state.applications = state.applications.filter(
              (application) => application.id !== id
            );
          })
        ];
        break;
    }
    return state;
  };
  const [applications, dispatch] = useReducer(reducer, { applications: [] });
  return (
    <ApplicationsContext.Provider value={[applications, dispatch]}>
      {children}
    </ApplicationsContext.Provider>
  );
};

export { useApplications, Application, Applications };

export default Applications;
