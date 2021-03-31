import React from "react";
import generateID from "../../functions/generateID";
import DaemonApplication from "./DaemonApplication";
import RunningApplication from "./RunningApplication";
import WindowApplication from "./WindowApplication";

type nullableFC = null | React.FunctionComponent;

type Dimensions = {
  width: number;
  height: number;
};

/**
 * Represents an application
 */
export default class Application {
  private m_updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>;
  private m_id = generateID();
  private m_displayName: string;
  private m_shortcut: string;
  private m_icon: string;
  private m_runOnStartup: boolean;
  // If no component provided => this is a daemon
  private m_component: nullableFC;
  private m_dimensions: Dimensions;

  constructor(
    updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>,
    displayName: string,
    icon: string = "",
    shortcut: string = "",
    runOnStartup: boolean = false,
    component: nullableFC = null,
    dimensions: Dimensions = { height: 0, width: 0 }
  ) {
    this.m_updater = updater;
    this.m_displayName = displayName;
    this.m_icon = icon;
    this.m_shortcut = shortcut;
    this.m_runOnStartup = runOnStartup;
    this.m_component = component;
    this.m_dimensions = dimensions;
    if (runOnStartup) this.run();
  }

  public get displayName(): string {
    return this.m_displayName;
  }

  public get id(): string {
    return this.m_id;
  }

  public get icon(): string {
    return this.m_icon;
  }

  public get component(): nullableFC {
    return this.m_component;
  }

  public get shortcut(): string {
    return this.m_shortcut;
  }

  public get runOnStartup(): boolean {
    return this.m_runOnStartup;
  }

  public get width(): number {
    return this.m_dimensions.width;
  }

  public get height(): number {
    return this.m_dimensions.height;
  }

  public get dimensions(): Dimensions {
    return this.m_dimensions;
  }

  run() {
    this.m_updater(([...state]) =>
      this.component
        ? [
            ...state,
            new WindowApplication(
              this.m_updater,
              this.component,
              this.displayName,
              this.icon
            )
          ]
        : [
            ...state,
            new DaemonApplication(this.m_updater, this.displayName, this.icon)
          ]
    );
  }
}
