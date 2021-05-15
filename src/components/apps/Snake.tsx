import { FunctionComponent, memo, PropsWithChildren } from "react";

interface IProps {}

const Snake: FunctionComponent<IProps> = () => {
  return <div>Snake app</div>;
};

export default memo<PropsWithChildren<IProps>>(Snake);
