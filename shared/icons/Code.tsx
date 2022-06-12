import { FC, memo } from "react"
import { IoCodeSlashOutline } from "react-icons/io5"

type Props = {
	className?: string
}
const Code: FC<Props> = ({ className }) => <IoCodeSlashOutline className={className}></IoCodeSlashOutline>

export default memo(Code)
