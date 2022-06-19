import { useUsersStore } from "context/users"
import { useEffect } from "react"
import Avatar from "../shared/ui/Avatar"
import Button from "../shared/ui/input/Button"
import Typography from "../shared/ui/Typography"
import classes from "../styles/pages/Lock.module.scss"
import { Page } from "../types/Page"

const Lock: Page = () => {
	const users = useUsersStore((store) => store.elements)
	const user = useUsersStore((store) => store.elements[store.currentUserID])

	const setCurrentUserID = useUsersStore((store) => store.setCurrentUserID)

	useEffect(() => { for (const key in users) setCurrentUserID(key) }, [users, setCurrentUserID])

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
						onClick={() => setCurrentUserID(key)}
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
