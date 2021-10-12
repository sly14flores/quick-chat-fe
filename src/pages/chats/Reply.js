const Reply = ({conversation}) => {

  const { senderName, message } = conversation

  const i = senderName.substring(0,1).toUpperCase()

  return (
    <>
      <div className="col-start-1 col-end-8 p-3 rounded-lg">
        <div className="flex flex-row items-center">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          >
            {i}
          </div>
          <div
            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
          >
            <div>{message}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reply