import classes from "./Image.module.scss";
import { FunctionComponent, memo } from "react";

interface IProps {
  pid: string;
  args: { alt: string; src: string };
}

const Image: FunctionComponent<IProps> = (props) => {
  const { alt, src } = props.args;
  return (
    <div className={classes["root"]}>
      <img alt={alt} src={src} />
    </div>
  );
};

export default memo(Image);
