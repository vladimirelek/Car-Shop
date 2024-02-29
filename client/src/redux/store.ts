import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import carsSlice from "../features/CarsAction/carsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cars: carsSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
