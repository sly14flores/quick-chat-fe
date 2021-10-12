import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getUnreadThunk } from '../../thunk/user/thunk'
import classNames from "classnames"

const User = ({ socket, user, handleClick }) => {

  const dispatch = useDispatch()

  const receiverId = localStorage.quickChatId
  const senderId = user._id

  const [newMessage, setNewMessage] = useState(false)

  const { name } = user

  const i = (name.substring(0, 1)).toUpperCase()

  const activeConversation = useSelector(state => state.user.activeConversation)
  const unreads = useSelector(state => state.user.unreads)

  const classes = classNames(
    "flex flex-row items-center rounded-xl p-2",
    {
      "bg-gray-100": activeConversation?._id === user._id,
      "hover:bg-gray-100": activeConversation?._id !== user._id
    }
  )

  const nameClasses = classNames(
    "ml-2 text-sm",
    {
      "font-semibold": !newMessage,
      "font-bold": newMessage,
      "text-blue-700": newMessage
    }
  )

  useEffect(() => {
    dispatch(getUnreadThunk({receiverId, senderId}))
  },[dispatch,receiverId,senderId])

  useEffect(() => {

    const i = unreads.findIndex(u => {
      return u.senderId === senderId && u.receiverId === receiverId
    })
    if (unreads[i]) {
      const check = unreads[i].messages.some(u => {
        return u.isRead === false
      })
      setNewMessage(check)
    }
  },[unreads,senderId,receiverId])

  useEffect(() => {

    socket.on("getConvo", (payload) => {
      dispatch(getUnreadThunk({receiverId, senderId}))
    })

  },[socket,dispatch,receiverId,senderId])

  // useEffect(() => {

  //   socket.on("chatFocus", (payload) => {
  //     const i = unreads.findIndex(u => {
  //       return u.senderId === senderId && u.receiverId === receiverId
  //     })
  //     if (unreads[i]) {
  //       const check = unreads[i].messages.some(u => {
  //         return u.isRead === false
  //       })
  //       setNewMessage(check)
  //     }
  //   })

  // },[socket,unreads,senderId,receiverId])

  return (
    <>
      <button
        onClick={() => handleClick(user)}
        className={classes}
      >
        <div
          className="flex items-center justify-center h-8 w-8 bg-orange-200 rounded-full"
        >
          {i}
        </div>
        <div className={nameClasses}>{ name }</div>
      </button>
    </>
  )
}

export default User