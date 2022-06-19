import create from "zustand"
import generateID from "../functions/generateID"

type User = {
	displayName: string
	id: string
	language: "en" | "fr" | "de"
	password?: string
	profileImage: typeof window.Image | null
	profileImageURL: string
}

type UsersStore = {
	currentUserID: string
	elements: { [uid: string]: User }
	setCurrentUserID: (uid: string) => void,
}

const uid = generateID()

const elements: UsersStore["elements"] = {
	[uid]: {
		displayName: "Guest",
		id: uid,
		language: "en",
		password: "",
		profileImage: null,
		profileImageURL: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
	},
}

export const useUsersStore = create<UsersStore>((set) => ({
	currentUserID: uid,
	elements,
	setCurrentUserID: (currentUserID) => set(() => ({ currentUserID })),
}))
