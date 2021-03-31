import RunningApplication from "./RunningApplication";
import Snap from "../Snap";

/**
 * Represents a running window application
 */
export default class WindowApplication extends RunningApplication {
  private static zIndexes: string[] = [];
  private m_width: number | null = null;
  private m_height: number | null = null;
  private m_minWidth: number | null = 300;
  private m_minHeight: number | null = 500;
  private m_minimized = false;
  private m_maximized: Snap = Snap.none;
  private m_displayName: string;
  private m_icon: string;
  private m_component: React.FunctionComponent;

  constructor(
    updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>,
    component: React.FunctionComponent,
    displayName: string,
    icon: string
  ) {
    super(updater);
    this.m_component = component;
    this.m_displayName = displayName;
    this.m_icon = icon;
    WindowApplication.zIndexes.push(this.id);
  }

  public get component(): React.FunctionComponent {
    return this.m_component;
  }

  public get displayName(): string {
    return this.m_displayName;
  }

  public get icon(): string {
    return this.m_icon;
  }

  public get maximized(): Snap {
    return this.m_maximized;
  }

  public get minimized(): boolean {
    return this.m_minimized;
  }

  public get width(): number | null {
    return this.m_width;
  }

  public get height(): number | null {
    return this.m_height;
  }

  public get minWidth(): number | null {
    return this.m_minWidth;
  }

  public get minHeight(): number | null {
    return this.m_minHeight;
  }

  public set minimized(v: boolean) {
    if (v === this.m_minimized) return;
    this.m_updater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowApplication).m_minimized = v;
      return state;
    });
  }

  public set maximized(v: Snap) {
    if (v === this.m_maximized) return;
    this.m_updater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowApplication).m_maximized = v;
      return state;
    });
  }

  public get zIndex(): number {
    return WindowApplication.zIndexes.indexOf(this.id);
  }

  sendToFront() {
    WindowApplication.zIndexes.splice(
      WindowApplication.zIndexes.indexOf(this.id),
      1
    );
    WindowApplication.zIndexes.push(this.id);
    this.m_updater(([...state]) => state);
  }

  close() {
    WindowApplication.zIndexes.splice(
      WindowApplication.zIndexes.indexOf(this.id),
      1
    );
    this.m_updater((state) => state.filter((app) => app !== this));
  }
}
