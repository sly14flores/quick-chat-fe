const Message = ({conversation}) => {

  const { senderName, message, isRead } = conversation

  const i = senderName.substring(0,1).toUpperCase()

  return (
    <>
      <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          >
            {i}
          </div>
          <div
            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
          >
            <div>
              {message}
            </div>
            {
              isRead &&
              <div
                className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
              >
                Seen
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Message