import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import generateID from "../../functions/generateID";

interface IUser {
  displayName: string;
  id: string;
  language: "fr" | "de";
  password?: string;
  profileImage: typeof window.Image | null;
  profileImageURL: string;
}

interface UsersState {
  elements: {[uid: string]: IUser;};
  currentUserID: string;
}

const initialState: UsersState = {elements: {}, currentUserID: ""};

const uid = generateID();

initialState.elements[uid] = {
  displayName: "Guest",
  id: uid,
  language: "fr",
  password: "",
  profileImage: null,
  profileImageURL:
    "https://images.unsplash.com/photo-1526137844794-45f1041f397a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserID(state, action: PayloadAction<string>) {
      state.currentUserID = action.payload;
    }
  }
});

export const {setCurrentUserID} = usersSlice.actions;

export default usersSlice.reducer;
