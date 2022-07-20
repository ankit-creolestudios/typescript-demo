import { all } from "redux-saga/effects";
import fetchUsersHere from "../feature/User/UserSaga";

function* rootSaga() {
  yield all([fetchUsersHere()]);
}

export default rootSaga;
