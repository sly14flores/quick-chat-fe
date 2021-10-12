import { createSlice } from '@reduxjs/toolkit'
import {
  getUsersThunk,
  createUserThunk,
  createConvoThunk,
  getConvoThunk,
  getUnreadThunk,
  readMessageThunk,
} from '../../thunk/user/thunk'

const initialState = {
  loading: false,
  user: {
    name: '',
    online: false,
  },
  users: [],
  conversations: [],
  chatBox: false,
  activeConversation: {},
  receiverId: null,
  sending: false,
  unreads: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleChatBox: (state, action) => {
      state.chatBox = action.payload
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload
    },
    setMessagesRead: (state, action) => {
      const i = action.payload

      const unreadsCopy = state.unreads
      const messages = unreadsCopy[i].messages.map(m => {
        m.isRead = true
        return m
      })

      unreadsCopy[i].messages = [...messages]

      state.unreads = [...unreadsCopy]
    }
  },
  extraReducers: {

    [getUsersThunk.pending]: (state, action) => {

    },
    [getUsersThunk.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [getUsersThunk.rejected]: (state, action) => {
      
    },

    [createUserThunk.pending]: (state) => {
      state.loading = true
    },
    [createUserThunk.fulfilled]: (state, action) => {
      // state.loading = false
      localStorage.quickChatId = action.payload._id
      localStorage.quickChatName = action.payload.name
      window.location.href = "/chats"
    },
    [createUserThunk.rejected]: (state, action) => {
      
    },

    [createConvoThunk.pending]: (state) => {
      state.sending = true
    },
    [createConvoThunk.fulfilled]: (state, action) => {
      state.sending = false
      const quickChatId = localStorage.quickChatId
      state.conversations = action.payload.map(c => {
        c.isReply = quickChatId === c.receiverId
        return c
      })
    },
    [createConvoThunk.rejected]: (state, action) => {
      
    },

    [getConvoThunk.pending]: (state) => {

    },
    [getConvoThunk.fulfilled]: (state, action) => {
      const quickChatId = localStorage.quickChatId
      state.conversations = action.payload.map(c => {
        c.isReply = quickChatId === c.receiverId
        return c
      })
    },
    [getConvoThunk.rejected]: (state, action) => {
      
    },

    [getUnreadThunk.pending]: (state) => {

    },
    [getUnreadThunk.fulfilled]: (state, action) => {
      if (action.payload.length > 0) {

        const i = state.unreads.findIndex(u => {
          return u.senderId === action.payload[0].senderId && u.receiverId === action.payload[0].receiverId
        })

        if (i>=0) {
          const unreadsCopy = [...state.unreads]
          console.log(unreadsCopy)
          unreadsCopy[i].messages = action.payload
          state.unreads = [...unreadsCopy]
        } else {
          state.unreads.push({
            senderId: action.payload[0].senderId,
            receiverId: action.payload[0].receiverId,
            messages: action.payload
          })
        }

      }
    },
    [getUnreadThunk.rejected]: (state, action) => {
      
    },

    [readMessageThunk.pending]: (state) => {

    },
    [readMessageThunk.fulfilled]: (state, action) => {

    },
    [readMessageThunk.rejected]: (state, action) => {
      
    },

  }
})

// Action creators are generated for each case reducer function
export const {
  loadConversations,
  toggleChatBox,
  setActiveConversation,
  setMessagesRead,
} = userSlice.actions

export default userSlice.reducer