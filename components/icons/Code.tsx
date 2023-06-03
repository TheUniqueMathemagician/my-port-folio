import { FunctionComponent, memo } from "react"
import { IoCodeSlashOutline } from "react-icons/io5"

type Props = {
	className?: string
}
const Code: FunctionComponent<Props> = ({ className }) => <IoCodeSlashOutline className={className}></IoCodeSlashOutline>

export default memo(Code)
