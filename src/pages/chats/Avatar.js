import { useHistory } from "react-router"
import { useDispatch } from 'react-redux'

import { logoutUserThunk } from '../../thunk/user/thunk'

const Avatar = ({ socket }) => {

  const name = localStorage.quickChatName
  const id = localStorage.quickChatId || null

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {

    dispatch(logoutUserThunk({id}))
    socket.emit('logout', id)

    history.push("/")

  }

  return (
    <>
      <div
        className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
      >
        {/* <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src="https://avatars3.githubusercontent.com/u/2763884?s=128"
            alt="Avatar"
            className="h-full w-full"
          />
        </div> */}
        <div className="inline-flex">
          <div className="text-sm font-semibold">Welcome, {name}</div>
          <button className="ml-1" type="button" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
        {/* <div className="flex flex-row items-center mt-3">
          <div
            className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
          >
            <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
          </div>
          <div className="leading-none ml-1 text-xs">Active</div>
        </div> */}
      </div>
    </>
  )
}

export default Avatar