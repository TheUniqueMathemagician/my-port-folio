import classes from "./Avatar.module.scss";
import { FunctionComponent } from "react";

interface IProps {
  alt: string;
  src: string;
}

const Avatar: FunctionComponent<IProps> = (props) => {
  const { alt, children, src } = props;

  return (
    <img alt={alt} src={src} className={classes["root"]}>
      {children}
    </img>
  );
};

export default Avatar;
