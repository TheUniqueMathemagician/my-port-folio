import {FC, memo} from "react";
import classes from "./Randit.module.scss";

interface Props {
  pid: string;
}

const Randit: FC<Props> = (props) => {
  const {pid} = props;

  return <iframe
    src="https://randit.web.app/"
    className={classes["root"]}
    title={pid + "_location_frame"}
  ></iframe>;
};

export default memo(Randit);
