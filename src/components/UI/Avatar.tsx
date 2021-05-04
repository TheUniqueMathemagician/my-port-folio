import classes from "./Avatar.module.scss";
import { FunctionComponent, memo } from "react";
import { TSize } from "../../types/TSize";

interface IProps {
  alt: string;
  src: string;
  size?: TSize;
  outlined?: boolean;
}

const Avatar: FunctionComponent<IProps> = (props) => {
  const { alt, children, src, outlined, size } = props;

  const rootClasses = [classes["root"]];

  if (outlined) rootClasses.push(classes["outlined"]);
  if (size) rootClasses.push(classes[size]);

  return (
    <img
      onDragStart={(e) => {
        e.preventDefault();
      }}
      alt={alt}
      src={src}
      className={rootClasses.join(" ")}
    >
      {children}
    </img>
  );
};

export default memo(Avatar);
