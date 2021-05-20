import classes from "./Randit.module.scss";
import { FunctionComponent, memo } from "react";

interface IProps {
  pid: string;
}

const Randit: FunctionComponent<IProps> = (props) => {
  const { pid } = props;
  return (
    <iframe
      src="https://randit.web.app/"
      className={classes["root"]}
      title={pid + "_location_frame"}
    ></iframe>
  );
};

export default memo(Randit);
