import EResize from "../../types/EResize";
import ESnap from "../../types/ESnap";
import IDimensions from "../../types/IDimensions";
import IPosition from "../../types/IPosition";
import ApplicationInstance from "./ApplicationInstance";
import WindowApplication from "./WindowApplication";

export default class WindowInstance extends ApplicationInstance {
  private m_position: IPosition;
  private m_width: number;
  private m_height: number;
  private m_minWidth: number;
  private m_minHeight: number;
  private m_maxWidth: number;
  private m_maxHeight: number;
  private m_resizable: boolean;
  private m_resizeMode: EResize = EResize.none;
  private m_resizing: boolean = false;
  private m_dragging: boolean = false;
  private m_minimized: boolean = false;
  private m_maximized: ESnap = ESnap.none;
  private m_component: React.FunctionComponent;
  private static zIndexes: string[] = [];

  /**
   *
   */
  constructor(window: WindowApplication, args: any) {
    super(window.icon, window.displayName);
    this.m_position = window.position;
    this.m_height = window.dimensions.height;
    this.m_width = window.dimensions.width;
    this.m_minHeight = window.minDimensions.height;
    this.m_minWidth = window.minDimensions.width;
    this.m_maxHeight = window.maxDimensions.height;
    this.m_maxWidth = window.maxDimensions.width;
    this.m_resizable = window.resizable;
    this.m_component = window.component;
    WindowInstance.zIndexes.push(this.id);
  }

  public get position(): IPosition {
    return this.m_position;
  }

  public get height(): number {
    return this.m_height;
  }

  public get width(): number {
    return this.m_width;
  }

  public get minHeight(): number {
    return this.m_minHeight;
  }

  public get minWidth(): number {
    return this.m_minWidth;
  }

  public get component(): React.FunctionComponent {
    return this.m_component;
  }

  public get minimized(): boolean {
    return this.m_minimized;
  }

  public get maximized(): ESnap {
    return this.m_maximized;
  }

  public get resizable(): Boolean {
    return this.m_resizable;
  }

  public get resizeMode(): EResize {
    return this.m_resizeMode;
  }

  public get resizing(): boolean {
    return this.m_resizing;
  }

  public get dragging(): boolean {
    return this.m_dragging;
  }

  // TODO: set min and max
  public set position(v: IPosition) {
    this.instancesUpdater(([...instances]) => {
      const instance = instances[
        instances.findIndex((app) => app === this)
      ] as WindowInstance;
      instance.position.top = v.top;
      instance.position.left = v.left;
      instance.position.bottom = v.bottom;
      instance.position.right = v.right;
      return instances;
    });
    // this.instancesUpdater(([...instances]) => {
    //   this.m_position.top = v.top;
    //   this.m_position.left = v.left;
    //   this.m_position.bottom = v.bottom;
    //   this.m_position.right = v.right;
    //   return instances;
    // });
  }

  public set dimensions(v: IDimensions) {
    if (v.height === this.m_height && v.width === this.m_width) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_height = v.height;
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_width = v.width;
      return state;
    });
  }

  public set minimized(v: boolean) {
    if (v === this.m_minimized) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_minimized = v;
      return state;
    });
  }

  public set maximized(v: ESnap) {
    if (v === this.m_maximized) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_maximized = v;
      return state;
    });
  }

  public set resizeMode(v: EResize) {
    if (v === this.m_resizeMode) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_resizeMode = v;
      return state;
    });
  }

  public set resizing(v: boolean) {
    if (!this.m_resizable) return;
    if (v === this.m_resizing) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_resizing = v;
      return state;
    });
  }

  public set dragging(v: boolean) {
    if (v === this.m_dragging) return;
    this.instancesUpdater(([...state]) => {
      (state[
        state.findIndex((app) => app === this)
      ] as WindowInstance).m_dragging = v;
      return state;
    });
  }

  public get zIndex(): number {
    return WindowInstance.zIndexes.indexOf(this.id);
  }

  public close() {
    WindowInstance.zIndexes.splice(WindowInstance.zIndexes.indexOf(this.id), 1);
    super.close();
  }

  public sendToFront() {
    WindowInstance.zIndexes.splice(WindowInstance.zIndexes.indexOf(this.id), 1);
    WindowInstance.zIndexes.push(this.id);
    this.instancesUpdater(([...state]) => state);
  }
}
