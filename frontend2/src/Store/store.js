import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "../Slices/userDataSlice";
import userSlice from "../Slices/userSlice";

const Store = configureStore({
  reducer: {
    User: userSlice,
    userData: userDataSlice,
  },
});

export default Store;
