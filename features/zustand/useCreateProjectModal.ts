import {useQueryState, parseAsBoolean} from "nuqs"

const useCreateProjectModal =()=>{
  const [isOpen, setIsOpen] = useQueryState(
    "create_project",
    parseAsBoolean.withDefault(false).withOptions({clearOnDefault:true})
  )
  const onOpen = ()=> setIsOpen(true)
  const onClose = ()=> setIsOpen(false)

  return {
    isOpen,
    onOpen,
    onClose,
    setIsOpen
  }
}

export default useCreateProjectModal