import { FunctionComponent, memo } from "react"
import { IoCodeSlashOutline } from "react-icons/io5"

type CodeProps = {
	className?: string
}

const Code: FunctionComponent<CodeProps> = ({ className }) => <IoCodeSlashOutline className={className}></IoCodeSlashOutline>

export default memo(Code)
