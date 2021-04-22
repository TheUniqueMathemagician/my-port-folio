import { configureStore } from "@reduxjs/toolkit";
import applications from "./reducers/Applications";
import instances from "./reducers/Instances";
import os from "./reducers/OS";
import theme from "./reducers/Theme";
import users from "./reducers/Users";

export const store = configureStore({
  reducer: { applications, instances, theme, os, users }
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
