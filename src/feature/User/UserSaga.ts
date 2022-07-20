import axiosClient from "../../api/axiosClient";
import { ListResponse } from "../../common";
import { call, put, takeLatest } from "redux-saga/effects";
import userApi from "../../api/userApi";
import { User } from "../../models/user";
import { userActions } from "./userSlice";
import { PayloadAction } from "@reduxjs/toolkit";

function* fetchUsers() {
  try {
    const res: ListResponse<User> = yield call(userApi.getAllUser);
    yield put(userActions.fetchUserSuccess(res));
  } catch (err) {
    console.log(err);
  }
}

function* addUsers(action: PayloadAction<User>) {
  try {
    yield put(userActions.addUserSuccess(action.payload));
  } catch (err) {
    console.log(err);
  }
}
function* fetchUsersHere() {
  yield takeLatest(userActions.fetchUserStart.type, fetchUsers);
  yield takeLatest(userActions.addUserStart.type, addUsers);
}
export default fetchUsersHere;
