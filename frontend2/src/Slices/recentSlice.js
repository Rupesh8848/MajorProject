import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../BaseUrl";

export const addToRecent = createAsyncThunk(
  "set/recentData",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { fileId, user } = payload;
    const response = await axios.post(`${baseUrl}/api/recent`, {
      fileId,
      user,
      date: Date.now(),
    });
    return response.data;
  }
);

export const getRecent = createAsyncThunk(
  "get/recentData",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { User } = getState();
    console.log(User.data._id);
    const response = await axios.get(`${baseUrl}/api/recent/${User.data._id}`);
    return response.data;
  }
);

const recentSlice = createSlice({
  name: "Recent",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToRecent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToRecent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addToRecent.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(getRecent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRecent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecent.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default recentSlice.reducer;