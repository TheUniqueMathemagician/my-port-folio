import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OsState {
  hasRanStartupApplications: boolean;
}

const initialState: OsState = {
  hasRanStartupApplications: false
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
