import {
	TypedUseSelectorHook,
	useDispatch as useDefaultDispatch,
	useSelector as useDefaultSelector
} from "react-redux"
import type { StoreDispatch, StoreState } from "../store"

export const useDispatch = () => useDefaultDispatch<StoreDispatch>()
export const useSelector: TypedUseSelectorHook<StoreState> = useDefaultSelector
