type TPosition = null | number | "50%" | "100%";

export default interface IPosition {
  bottom: TPosition;
  left: TPosition;
  right: TPosition;
  top: TPosition;
}
