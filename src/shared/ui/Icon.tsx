import React, {FC, memo} from "react";

const Icon: FC = ({children}) => <>{React.Children.only(children)}</>;

export default memo(Icon);
