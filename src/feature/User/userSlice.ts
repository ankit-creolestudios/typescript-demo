import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListResponse } from "../../common";
import { User } from "../../models/user";
import fetchUsers from "./UserSaga";

interface UserState {
  loading?: boolean;
  users: User[];
  user: User | object;
}

const initialState: UserState = {
  loading: false,
  users: [],
  user: {},
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action: PayloadAction<ListResponse<User>>) => {
      state.loading = false;
      state.users = action.payload.data;
    },
    fetchUserFailed: (state) => {
      state.loading = false;
    },
    addUserStart: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    addUserFailed: (state) => {
      state.loading = false;
    },
  },
});

export const userActions = userSlice.actions;
export const selectUserLoading = (state: RootState) =>
  state.userReducer.loading;
export const selectUserList = (state: RootState) => state.userReducer.users;
export default userSlice.reducer;
