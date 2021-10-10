import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IReduxStore } from './ReduxStore'

//  following https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IReduxStore> = useSelector
