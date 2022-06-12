import React, { FC, memo, ReactNode } from "react"

type Props = {
	children: ReactNode
}

const Icon: FC<Props> = ({ children }) => <>{React.Children.only(children)}</>

export default memo(Icon)
