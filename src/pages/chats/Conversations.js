import { Fragment, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getConvoThunk } from '../../thunk/user/thunk'

import Reply from "./Reply"
import Message from "./Message"

const Conversations = ({ socket }) => {

  const conversations = useSelector(state => state.user.conversations)
  const activeConversation = useSelector(state => state.user.activeConversation)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on("getConvo", (payload) => {
      const receiverId = localStorage.quickChatId
      if (receiverId === payload.receiverId && activeConversation?._id) {
        dispatch(getConvoThunk({
          receiverId,
          senderId: activeConversation?._id
        }))
        const chatBox = document.querySelector("#chatBox")
        chatBox.scrollIntoView({
          block: 'end',
          behavior: 'smooth'
        })
      }
    })
  },[socket,activeConversation?._id,dispatch])

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div id="chatBox" className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          {
            conversations?.map((conversation,i) => 
              <Fragment key={i}>
                {
                  conversation.isReply
                  ?
                  <Reply conversation={conversation} />
                  :
                  <Message conversation={conversation} />
                }
              </Fragment>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Conversations