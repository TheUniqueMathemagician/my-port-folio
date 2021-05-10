import classes from "./Code.module.scss";
import { FunctionComponent, memo } from "react";
import { IoCodeSlashOutline } from "react-icons/io5";

interface IProps {
  className?: string;
}
// TODO: Icon wrapper
const Code: FunctionComponent<IProps> = (props) => {
  const { className } = props;
  const rootClasses = [classes["root"]];

  if (className) rootClasses.push(className);

  return (
    <IoCodeSlashOutline className={rootClasses.join(" ")}></IoCodeSlashOutline>
  );
};

export default memo(Code);
