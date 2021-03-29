export default class Application {
  private m_component: React.FunctionComponent;
  private m_id: string;
  private m_name: string;
  private m_maximized: boolean;
  private m_minimized: boolean;
  private m_render: React.Dispatch<React.SetStateAction<Application[]>>;

  constructor(
    name: string,
    component: React.FunctionComponent,
    renderer: React.Dispatch<React.SetStateAction<Application[]>>
  ) {
    this.m_component = component;
    this.m_id = "_" + Math.random().toString(36).substr(2, 9);
    this.m_name = name;
    this.m_maximized = false;
    this.m_minimized = false;
    this.m_render = renderer;
  }

  public get component(): React.FunctionComponent {
    return this.m_component;
  }
  public get id(): string {
    return this.m_id;
  }
  public get name(): string {
    return this.m_name;
  }
  public set name(v: string) {
    if (this.m_name === v) return;
    this.m_name = v;
    this.m_render(([...state]) => state);
  }
  public get minimized(): boolean {
    return this.m_minimized;
  }
  public set minimized(v: boolean) {
    if (this.m_minimized === v) return;
    this.m_minimized = v;
    this.m_render(([...state]) => state);
  }
  public get maximized(): boolean {
    return this.m_maximized;
  }
  public set maximized(v: boolean) {
    if (this.m_maximized === v) return;
    this.m_maximized = v;
    this.m_render(([...state]) => state);
  }

  public close() {
    this.m_render(([...state]) => state.filter((app) => app !== this));
  }
}
