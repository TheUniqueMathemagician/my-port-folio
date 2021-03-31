import React from "react";
import RunningApplication from "./RunningApplication";

export default class DaemonApplicaiton extends RunningApplication {
  private m_displayName: string;
  private m_icon: string;

  constructor(
    updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>,
    displayName: string,
    icon: string
  ) {
    super(updater);
    this.m_displayName = displayName;
    this.m_icon = icon;
  }

  public get displayName(): string {
    return this.m_displayName;
  }

  public get icon(): string {
    return this.m_icon;
  }
}
