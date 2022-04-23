import { useEffect } from "react"
import { useDispatch, useSelector } from "../hooks/Store"
import Avatar from "../shared/ui/Avatar"
import Button from "../shared/ui/input/Button"
import Typography from "../shared/ui/Typography"
import { setCurrentUserID } from "../store/slices/Users"
import classes from "../styles/pages/Lock.module.scss"
import { Page } from "../types/Page"

const Lock: Page = () => {
	const dispatch = useDispatch()

	const users = useSelector((store) => store.users.elements)
	const user = useSelector((store) => store.users.elements[store.users.currentUserID])

	useEffect(() => { for (const [key] of Object.entries(users)) dispatch(setCurrentUserID(key)) }, [users, dispatch])

	return <main className={classes["root"]}	>
		<div className={classes["bg"]}></div>
		<section>
			<Avatar
				size="xl"
				alt="Image de profil"
				src={user?.profileImageURL}
			></Avatar>
			<Button
				ripple
				variant="blur"
				focusable
				size="md"
				to="/workspace"
			>
				Se connecter
			</Button>
			<div className={classes["users"]}>
				{Object.keys(users).map((key) => (
					<Button
						startIcon
						variant="blur"
						size="md"
						focusable
						ripple
						key={key}
						onClick={() => dispatch(setCurrentUserID(key))}
					>
						<Avatar alt="Image de profil" src={users[key].profileImageURL}></Avatar>
						<Typography variant="body">{users[key].displayName}</Typography>
					</Button>
				))}
			</div>
		</section>
	</main>
}

export default Lock
