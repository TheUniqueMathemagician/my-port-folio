"use client"

import Avatar from "@/components/ui/Avatar"
import Typography from "@/components/ui/Typography"
import Button from "@/components/ui/input/Button"
import classes from "@/styles/pages/Lock.module.scss"
import { useUsersStore } from "context/users"
import { useEffect, type FunctionComponent } from "react"

const Lock: FunctionComponent = () => {
	const user = useUsersStore((store) => store.elements[store.currentUserId])
	const users = useUsersStore((store) => store.elements)
	const setCurrentUserId = useUsersStore((store) => store.setCurrentUserId)

	useEffect(() => {
		for (const key in users) if (key) setCurrentUserId(key)
	}, [users, setCurrentUserId])

	return <main className={classes["root"]}	>
		<div className={classes["bg"]}></div>
		<section>
			<Avatar
				size="xl"
				alt="Image de profil"
				src={user?.profileImageUrl}
			></Avatar>
			<Button
				ripple
				focusable
				variant="filled"
				size="md"
				to="/workspace"
			>
				Se connecter
			</Button>
			<div className={classes["users"]}>
				{Object.keys(users).map((key) => <Button
					focusable
					key={key}
					onClick={() => setCurrentUserId(key)}
					ripple
					size="md"
					startIcon
					variant="blur"
				>
					<Avatar alt="Image de profil" src={users[key].profileImageUrl}></Avatar>
					<Typography variant="body">{users[key].displayName}</Typography>
				</Button>)}
			</div>
		</section>
	</main>
}

export default Lock
