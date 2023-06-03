import Avatar from "@/components/ui/Avatar"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/input/Button"
import { useUsersStore } from "context/users"
import { useEffect } from "react"
import classes from "../styles/pages/Lock.module.scss"
import { Page } from "../types/Page"

const Lock: Page = () => {
	const user = useUsersStore((store) => store.elements[store.currentUserID])
	const users = useUsersStore((store) => store.elements)
	const setCurrentUserID = useUsersStore((store) => store.setCurrentUserID)

	useEffect(() => {
		for (const key in users) if (key) setCurrentUserID(key)
	}, [users, setCurrentUserID])

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
				{Object.keys(users).map((key) => <Button
					focusable
					key={key}
					onClick={() => setCurrentUserID(key)}
					ripple
					size="md"
					startIcon
					variant="blur"
				>
					<Avatar alt="Image de profil" src={users[key].profileImageURL}></Avatar>
					<Typography variant="body">{users[key].displayName}</Typography>
				</Button>)}
			</div>
		</section>
	</main>
}

export default Lock
