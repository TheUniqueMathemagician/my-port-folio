import { FunctionComponent } from "react";

interface IProps {}

const TableBody: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <tbody>{children}</tbody>;
};

export default TableBody;
