import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user/slice'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
})