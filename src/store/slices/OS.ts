import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isMobile from "../../functions/isMobile";

interface OsState {
  hasRanStartupApplications: boolean;
  isMobile: boolean;
}

const initialState: OsState = {
  hasRanStartupApplications: false,
  isMobile: isMobile()
};

export const osSlice = createSlice({
  name: "os",
  initialState,
  reducers: {
    setHasRanStartupApplications(state, action: PayloadAction<boolean>) {
      state.hasRanStartupApplications = action.payload;
    },
    reset(state) {
      state.hasRanStartupApplications = false;
    }
  }
});

export const { reset, setHasRanStartupApplications } = osSlice.actions;

export default osSlice.reducer;
