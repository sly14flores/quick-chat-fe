import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createConvoThunk, readMessageThunk } from "../../thunk/user/thunk"

import Spinner from '../../components/Spinner'

const ChatBox = ({ id, name, socket }) => {

  const chatBox = useSelector(state => state.user.chatBox)
  const sending = useSelector(state => state.user.sending)
  const activeConversation = useSelector(state => state.user.activeConversation)
  const conversations = useSelector(state => state.user.conversations)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const handleFocus = () => {
    if (conversations.length > 0) {
      const conversation = conversations[conversations.length-1]
      dispatch(readMessageThunk({id: conversation._id}))
      setTimeout(() => {
        socket.emit("message", {receiverId: activeConversation._id})
        socket.emit("chat", {})
      }, 1000)
    }
  }

  const sendMessage = (e) => {

    e.preventDefault()

    if (message==='') return

    let receiverId = activeConversation._id
    let receiverName = activeConversation.name
    let senderId = id
    let senderName = name
    let messageGroup = null
    const isRead = false

    if (conversations.length>0) {
      messageGroup = conversations[0].messageGroup
    }

    const payload = {
      receiverId,
      receiverName,
      senderId,
      senderName,
      message,
      messageGroup,
      isRead
    }
    setMessage('')
    dispatch(createConvoThunk(payload))

    socket.emit('message', payload)

  }

  useEffect(() => {

    socket.on("connect", () => {
      console.log("Socket.io client is connected"); // true
    });

  },[socket])

  return (
    <form onSubmit={sendMessage}>
      <div
        className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
      >
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              disabled={!chatBox || sending}
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              value={message}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <button
              className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
            >
            </button>
          </div>
        </div>
        <div className="ml-4">
          <button
            type="submit"
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            disabled={!chatBox || sending}
          >
            <Spinner loading={sending} />
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default ChatBox