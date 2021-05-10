import React, { FunctionComponent, memo } from "react";

interface IProps {}

const Icon: FunctionComponent<IProps> = (props) => {
  const { children } = props;
  return <>{React.Children.only(children)}</>;
};

export default memo(Icon);
