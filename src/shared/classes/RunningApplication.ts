import generateID from "../../functions/generateID";

/**
 * Represents a running application either window or background
 */
export default class RunningApplication {
  protected m_updater: React.Dispatch<
    React.SetStateAction<RunningApplication[]>
  >;
  private m_id = generateID();

  constructor(
    updater: React.Dispatch<React.SetStateAction<RunningApplication[]>>
  ) {
    this.m_updater = updater;
  }

  public get id(): string {
    return this.m_id;
  }

  close() {
    this.m_updater((state) => state.filter((app) => app !== this));
  }
}
