import axios from 'axios';
const apiBaseUrl = "https://quickchat-be.herokuapp.com:4000/api"

const getUsersApi = (payload) => {
  const { id } = payload
  const response = `${apiBaseUrl}/users/${id}`
  return axios.get(response)
}

const createUserApi = (payload) => {
  const response = `${apiBaseUrl}/user`
  return axios.post(response, payload)
}

const logoutUserApi = (payload) => {
  const { id } = payload
  const response = `${apiBaseUrl}/logout/${id}`
  return axios.get(response)
}

const createConvoApi = (payload) => {
  const response = `${apiBaseUrl}/convo`
  return axios.post(response, payload)
}

const getConvoApi = (payload) => {
  const { senderId, receiverId } = payload
  const response = `${apiBaseUrl}/convo/${senderId}/${receiverId}`
  return axios.get(response)
}

const getUnreadApi = (payload) => {
  const { receiverId, senderId } = payload
  const response = `${apiBaseUrl}/users/unread/${receiverId}/${senderId}`
  return axios.get(response)
}

const readMessageApi = (payload) => {
  const { id } = payload
  const response = `${apiBaseUrl}/read`
  return axios.put(response,{id})
}

export { 
  getUsersApi,
  createUserApi,
  createConvoApi,
  getConvoApi,
  logoutUserApi,
  getUnreadApi,
  readMessageApi,
}