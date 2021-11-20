import {FunctionComponent, memo, useCallback} from "react";
import {TSize} from "../../types/TSize";
import classes from "./Avatar.module.scss";

interface IProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  alt: string;
  src: string;
  size?: TSize;
  outlined?: boolean;
  square?: boolean;
}

const Avatar: FunctionComponent<IProps> = (props) => {
  const {alt, className, src, outlined, size, square, ...other} = props;

  const handleDragStart = useCallback((e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
  }, []);

  const rootClasses = [classes["root"]];

  if (outlined) rootClasses.push(classes["outlined"]);
  if (size) rootClasses.push(classes[size]);
  if (square) rootClasses.push(classes["square"]);
  if (className) rootClasses.push(className);

  return <img
    onDragStart={handleDragStart}
    alt={alt}
    src={src}
    className={rootClasses.join(" ")}
    {...other}
  ></img>;
};

export default memo(Avatar);
