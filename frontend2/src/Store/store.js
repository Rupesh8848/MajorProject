import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "../Slices/userDataSlice";
import userSlice from "../Slices/userSlice";

export const Store = configureStore({
  reducer: {
    User: userSlice,
    userData: userDataSlice,
  },
});
