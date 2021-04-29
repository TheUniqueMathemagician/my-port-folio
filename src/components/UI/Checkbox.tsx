import { FunctionComponent } from "react";
import { TSize } from "../../types/TSize";

interface IProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  outlined?: boolean;
  ripple?: boolean;
  size?: TSize;
  startIcon?: boolean;
  checked: boolean;
  variant?: "flat" | "filled" | "blur";
}

// "aria-label": "primary checkbox"

const Checkbox: FunctionComponent<IProps> = () => {
  return <input type="checkbox" name="" onChange={(e) => {}}></input>;
};

export default Checkbox;
