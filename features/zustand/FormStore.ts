import {useQueryState, parseAsBoolean} from "nuqs"


const useWorkspaceForm = ()=>{
  const [isOpen, setIsOpen] = useQueryState(
    "create_workspace",
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


export default useWorkspaceForm
