import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Logo from "./Logo"
import Avatar from "./Avatar"
import Users from "./Users"
import Conversations from "./Conversations"
import ChatBox from "./ChatBox"

import { getUsersThunk } from "../../thunk/user/thunk"

const Chats = ({ socket }) => {

  const id = localStorage.quickChatId || null // Sender Id
  const name = localStorage.quickChatName || null // Sender Name
  const dispatch = useDispatch()

  useEffect(() => {

    if (id) {
      dispatch(getUsersThunk({id}))
    }

  },[id,dispatch])

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <Logo />
            <Avatar socket={socket} />
            <Users socket={socket} />
          </div>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <Conversations socket={socket} />
              <ChatBox id={id} name={name} socket={socket} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chats