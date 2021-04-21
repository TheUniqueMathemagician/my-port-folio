import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import generateID from "../../functions/generateID";

interface IUser {
  displayName: string;
  id: string;
  language: "fr" | "de";
  password?: string;
  profileImage: string;
}

interface UsersState {
  [uid: string]: IUser;
}

const initialState: UsersState = {};
let uid = "";

uid = generateID();
initialState[uid] = {
  displayName: "Guest",
  id: uid,
  language: "fr",
  password: "",
  profileImage:
    "https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
