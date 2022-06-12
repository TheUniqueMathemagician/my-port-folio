import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import generateID from "../../functions/generateID"

type User = {
	displayName: string
	id: string
	language: "en" | "fr" | "de"
	password?: string
	profileImage: typeof window.Image | null
	profileImageURL: string
}

type UsersState = {
	currentUserID: string
	elements: { [uid: string]: User }
}

const initialState: UsersState = { elements: {}, currentUserID: "" }

const uid = generateID()

initialState.elements[uid] = {
	displayName: "Guest",
	id: uid,
	language: "en",
	password: "",
	profileImage: null,
	profileImageURL: "https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80",
}

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setCurrentUserID(state: UsersState, action: PayloadAction<string>) {
			state.currentUserID = action.payload
		},
	},
})

export const { setCurrentUserID } = usersSlice.actions

export default usersSlice.reducer
