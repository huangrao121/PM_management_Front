import { parseAsString, useQueryState } from "nuqs"


const useEditTaskModal = ()=>{
  const [taskId, setTaskId] = useQueryState(
    "edit_task",
    parseAsString.withOptions({clearOnDefault:true})
  )
  const onOpen = (id: string)=> setTaskId(id)
  const onClose = ()=> setTaskId(null)

  return {
    taskId,
    onOpen,
    onClose,
    setTaskId
  }
}
export {useEditTaskModal}