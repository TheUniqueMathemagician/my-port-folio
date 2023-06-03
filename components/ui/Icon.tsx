import React, { FunctionComponent, PropsWithChildren, memo } from "react"

type Props = PropsWithChildren

const Icon: FunctionComponent<Props> = ({ children }) => <>{React.Children.only(children)}</>

export default memo(Icon)
