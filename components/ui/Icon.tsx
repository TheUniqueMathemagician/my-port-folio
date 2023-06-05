import React, { FunctionComponent, PropsWithChildren, memo } from "react"

type IconProps = PropsWithChildren

const Icon: FunctionComponent<IconProps> = ({ children }) => <>{React.Children.only(children)}</>

export default memo(Icon)
