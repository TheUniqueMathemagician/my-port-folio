import {configureStore} from "@reduxjs/toolkit";
import applications from "./slices/Applications";
import os from "./slices/OS";
import theme from "./slices/Theme";
import users from "./slices/Users";

export const store = configureStore({reducer: {applications, theme, os, users}});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
