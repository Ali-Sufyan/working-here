/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TypedUseSelectorHook,
  shallowEqual,
  useDispatch,
  useSelector,
} from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function useAppSelectorEqual(selector: (state: RootState) => any) {
  return useAppSelector(selector, shallowEqual);
}
