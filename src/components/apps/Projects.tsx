import classes from "./Projects.module.scss";
import { FunctionComponent, memo } from "react";

interface IProps {}

const Projects: FunctionComponent<IProps> = () => {
  // https://play.unity.com/mg/karting/a-beginner-s-project
  //   C'est un petit projet afin de découvrir unity et ses principes de base. Il m'a permi de tester un concept ; le WASM
  return (
    <div className={classes["root"]}>
      {/* <iframe src="https://play.unity.com/mg/karting/a-beginner-s-project"></iframe> */}
    </div>
  );
};

export default memo(Projects);
