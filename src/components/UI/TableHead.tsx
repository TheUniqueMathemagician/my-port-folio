import { FunctionComponent } from "react";

interface IProps {}

const TableHead: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <thead>{children}</thead>;
};

export default TableHead;
