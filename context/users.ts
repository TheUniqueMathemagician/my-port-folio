import generateID from "@/utils/generateID"
import { create } from "zustand"

type User = {
	displayName: string
	id: string
	language: "en" | "fr" | "de"
	password?: string
	profileImage: typeof window.Image | null
	profileImageUrl: string
}

type UsersStore = {
	currentUserId: string
	elements: { [uid: string]: User }
	setCurrentUserId: (uid: string) => void,
}

const uid = generateID()

const elements: UsersStore["elements"] = {
	[uid]: {
		displayName: "Guest",
		id: uid,
		language: "en",
		password: "",
		profileImage: null,
		profileImageUrl: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
	},
}

export const useUsersStore = create<UsersStore>((set) => ({
	currentUserId: uid,
	elements,
	setCurrentUserId: (currentUserId) => set(() => ({ currentUserId })),
}))
