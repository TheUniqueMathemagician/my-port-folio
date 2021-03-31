import RunningApplication from "./RunningApplication";
import Snap from "../Snap";

type Dimensions = {
  width: number;
  height: number;
};

enum Resize {
  none = "",
  top = "resize-top",
  bottom = "resize-bottom",
  left = "resize-left",
  right = "resize-right",
  topLeft = "resize-top-left",
  topRight = "resize-top-right",
  bottomLeft = "resize-bottom-left",
  bottomRight = "resize-bottom-right"
}

/**
 * Represents a running window application
 */
export default class WindowApplication extends RunningApplication {
  private static zIndexes: string[] = [];
  private m_width: number;
  private m_height: number;
  private m_minWidth: number;
  private m_minHeight: number;
  private m_maxWidth: number;
  private m_maxHeight: number;
  private m_resizable: boolean;
  private m_resize: Resize = Resize.none;
  private m_minimized = false;
  private m_maximized: Snap = Snap.none;
  private m_displayName: string;
  private m_icon: string;
  private m_component: React.FunctionComponent;

  constructor(
    updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>,
    component: React.FunctionComponent,
    displayName: string,
    icon: string,
    dimensions: Dimensions = { height: 800, width: 600 },
    minDimensions: Dimensions = { height: 200, width: 300 },
    maxDimensions: Dimensions = { height: 200, width: 300 },
    resizable: boolean = true
  ) {
    super(updater);
    this.m_component = component;
    this.m_displayName = displayName;
    this.m_icon = icon;
    this.m_width = dimensions.width;
    this.m_height = dimensions.height;
    this.m_minWidth = minDimensions.width;
    this.m_minHeight = minDimensions.height;
    this.m_maxWidth = maxDimensions.width;
    this.m_maxHeight = maxDimensions.height;
    this.m_resizable = resizable;
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

  public get minWidth(): number {
    return this.m_minWidth;
  }

  public get minHeight(): number {
    return this.m_minHeight;
  }

  public get maxWidth(): number | null {
    return this.m_maxWidth;
  }

  public get maxHeight(): number | null {
    return this.m_maxHeight;
  }

  public get width(): number {
    return this.m_width;
  }

  public get height(): number {
    return this.m_height;
  }

  public get dimensions(): Dimensions {
    return { width: this.m_width, height: this.m_height };
  }

  public get resize(): Resize {
    return this.m_resize;
  }

  public get resizable(): boolean {
    return this.m_resizable;
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

  public set resize(v: Resize) {
    if (v === this.m_resize) return;
    this.m_updater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowApplication).m_resize = v;
      return state;
    });
  }

  public set dimensions(v: Dimensions) {
    if (v.height === this.m_height && v.width === this.m_width) return;
    if (v.width < this.m_minWidth) {
      this.m_updater(([...state]) => {
        (state[
          state.findIndex((app) => app === this)
        ] as WindowApplication).m_height = v.height;
        return state;
      });
    } else if (v.height < this.m_minHeight) {
      this.m_updater(([...state]) => {
        (state[
          state.findIndex((app) => app === this)
        ] as WindowApplication).m_width = v.width;
        return state;
      });
    } else {
      this.m_updater(([...state]) => {
        (state[
          state.findIndex((app) => app === this)
        ] as WindowApplication).m_width = v.width;
        (state[
          state.findIndex((app) => app === this)
        ] as WindowApplication).m_height = v.height;
        return state;
      });
    }
  }

  public set width(v: number) {
    if (v === this.m_width || v < this.m_minWidth) return;
    this.m_updater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowApplication).m_width = v;
      return state;
    });
  }

  public set height(v: number) {
    if (v === this.m_height || v < this.m_minHeight) return;
    this.m_updater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowApplication).m_height = v;
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
