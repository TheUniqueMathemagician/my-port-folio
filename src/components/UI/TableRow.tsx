import { FunctionComponent } from "react";

interface IProps {}

const TableRow: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <tr>{children}</tr>;
};

export default TableRow;
