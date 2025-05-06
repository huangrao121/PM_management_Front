import { parseAsBoolean, useQueryState } from "nuqs"


const useCreateTaskModal = ()=>{
  const [isOpen, setIsOpen] = useQueryState(
    "create_task",
    parseAsBoolean.withDefault(false).withOptions({clearOnDefault:true})
  )
  const onOpen = ()=> setIsOpen(true)
  const onClose = ()=> {
    setTimeout(() => {
      setIsOpen(false)
    }
    , 200)
  }

  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpen
  }
}

export default useCreateTaskModal;
