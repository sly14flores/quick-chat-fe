import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsersApi,
  createUserApi,
  createConvoApi,
  getConvoApi,
  logoutUserApi,
  getUnreadApi,
  readMessageApi,
} from "./api";

const getUsersThunk = createAsyncThunk(
  "users/get",
  async(payload, thunkApi) => {
      const response = await getUsersApi(payload)
      return response.data
  }
)

const createUserThunk = createAsyncThunk(
  "users/create",
  async(payload, thunkApi) => {
      const response = await createUserApi(payload)
      return response.data
  }
)

const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async(payload, thunkApi) => {
      const response = await logoutUserApi(payload)
      return response.data
  }
)

const createConvoThunk = createAsyncThunk(
  "convo/create",
  async(payload, thunkApi) => {
      const response = await createConvoApi(payload)
      return response.data
  }
)

const getConvoThunk = createAsyncThunk(
  "convo/get",
  async(payload, thunkApi) => {
      const response = await getConvoApi(payload)
      return response.data
  }
)

const getUnreadThunk = createAsyncThunk(
  "users/unread",
  async(payload, thunkApi) => {
    const response = await getUnreadApi(payload)
    return response.data
  }
)

const readMessageThunk = createAsyncThunk(
  "convo/read",
  async(payload, thunkApi) => {
    const response = await readMessageApi(payload)
    return response.data
  }
)

export {
  getUsersThunk,
  createUserThunk,
  createConvoThunk,
  getConvoThunk,
  logoutUserThunk,
  getUnreadThunk,
  readMessageThunk
}