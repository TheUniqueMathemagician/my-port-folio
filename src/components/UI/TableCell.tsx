import classes from "./TableCell.module.scss";
import { FunctionComponent } from "react";

interface IProps {
  align?: "start" | "center" | "end";
  heading?: boolean;
}

const TableCell: FunctionComponent<IProps> = (props) => {
  const { align, children, heading } = props;

  const rootClasses = [classes["root"]];
  const containerClasses = [classes["container"]];

  if (align) containerClasses.push(classes[align]);

  if (heading)
    return (
      <th className={rootClasses.join(" ")}>
        <div className={containerClasses.join(" ")}>{children}</div>
      </th>
    );
  return (
    <td className={rootClasses.join(" ")}>
      <div className={containerClasses.join(" ")}>{children}</div>
    </td>
  );
};

export default TableCell;
