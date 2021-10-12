import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Spinner from '../../components/Spinner'
import { createUserThunk } from '../../thunk/user/thunk'

const User = ({ socket }) => {

  const loading = useSelector(state => state.user.loading)
  const [name, setName] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createUserThunk({
      name,
      online: true,
    }))
    socket.emit('login', {name})
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <form>
      <div className="w-full bg-gray-500 h-screen">
        <div className="p-10 pt-40 flex flex-col flex-wrap justify-center content-center">
          <div className="m-0 p-0 text-3xl text-white antialiased text-center">Quick Chat</div>
          <div className="m-0 p-0 text-xl text-white antialiased text-center">Enter your name to start chat</div>
          <div className="mt-3 flex flex-row flex-wrap w-1/3">
            <input onChange={handleChange} value={name} type="text" className="text-gray-600 w-2/3 p-2 rounded-l-lg" placeholder="Enter Name"/>
            <button
              type="submit" 
              onClick={handleSubmit} className="inline-flex p-2 w-1/3 bg-indigo-400 rounded-r-lg  text-white hover:bg-indigo-300"
            >
              <span className="mt-0.5"><Spinner loading={loading} /></span>
              Chat Now
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default User