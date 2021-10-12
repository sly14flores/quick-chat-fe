import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleChatBox, setActiveConversation, setMessagesRead } from '../../redux/user/slice'
import { getConvoThunk, getUsersThunk, readMessageThunk } from '../../thunk/user/thunk'

import User from './User'

const Users = ({ socket }) => {

  const users = useSelector(state => state.user.users)
  const unreads = useSelector(state => state.user.unreads)
  const dispatch = useDispatch()

  const senderId = localStorage.quickChatId

  const handleClick = (user) => {
    const receiverId = user._id

    const i = unreads.findIndex(u => {
      return u.senderId === receiverId
    })

    const messages = unreads?.[i]?.messages
    if (messages && messages.length>0) {
      dispatch(readMessageThunk({id: messages[messages.length-1]._id}))
      dispatch(setMessagesRead(i))
    }

    dispatch(setActiveConversation(user))
    dispatch(getConvoThunk({
      receiverId,
      senderId
    }))
    dispatch(toggleChatBox(true))
  }

  useEffect(() => {

    socket.on("userLogin", (payload) => {
      dispatch(getUsersThunk({id: senderId}))
    })

  },[socket,dispatch,senderId])

  const onlineUsers = users.filter(user => user.online)

  return (
    <>
      <div className="flex flex-col mt-8">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="font-bold">Active Conversations</span>
          <span
            className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
            >{onlineUsers.length>0 ? onlineUsers.length : ''}</span
          >
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
          {
            onlineUsers.map(user => {
              return (
                <User socket={socket} key={user._id} user={user} handleClick={handleClick} />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Users