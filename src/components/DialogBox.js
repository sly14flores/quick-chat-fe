import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const OkButton = ({ label, onClick }) => {

  return (
    <>
      <button
        className="mb-2 md:mb-0 bg-indigo-500 border border-indigo-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-600"
        onClick={onClick}
      >
        {label}
      </button>    
    </>
  )
}

const CloseButton = ({ label, onClick }) => {

  return (
    <>
      <button
        className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
        onClick={onClick}
      >
        {label}
      </button>    
    </>
  )
}

const DialogBox = ({
  isOpen,
  setIsOpen, 
  title,
  children,
  onOk,
  onClose,
  okLabel="Ok",
  closeLabel="Close"
}) => {

  function closeModal() {
    if (onClose) {
      onClose()
    }
    setIsOpen(false)
  }

  function callback() {
      if (onOk) {
          onOk()
          setIsOpen(false)
      }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="z-10 bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center">
          <div className="">
            <Dialog
              as="div"
              className="justify-between items-center"
              onClose={closeModal}
            >
              <div className="">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="z-50 w-full max-w-xs sm:max-w-lg p-5 fixed inset-32 mx-auto my-auto rounded-xl shadow-lg bg-white">
                    <Dialog.Title
                      as="div"
                      className="text-center p-5 flex-auto justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-indigo-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>              
                      <h2 className="text-xl font-bold py-4">{title}</h2>
                    </Dialog.Title>
                    <div className="pb-5 text-center flex-auto justify-center">
                      <p className="text-sm text-gray-500 px-8">{children}</p>
                    </div>
                    <div className="mt-4 p-3 text-center space-x-4 md:block">
                      <CloseButton
                        label={closeLabel}
                        onClick={closeModal}
                      />
                      <OkButton
                        label={okLabel}
                        onClick={callback}
                      />                      
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default DialogBox