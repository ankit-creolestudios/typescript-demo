import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserReducer from "../feature/User/userSlice";
import saga from "redux-saga";
import rootSaga from "./rootSaga";
const rootReducer = combineReducers({
  userReducer: UserReducer,
});
const sagaMiddleware = saga();
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>;

export type AppDisptch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDisptch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
