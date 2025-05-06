"use client"

import ResponsiveModal from "../responsive/Responsive-modal"
import {useEditTaskModal} from "@/features/zustand/useEditTaskModal"
import EditTaskFormWrapper from "./EditTaskFormWrapper"
const EditTaskModal = () => { 
  const {taskId, onClose} = useEditTaskModal()
  return (
    <ResponsiveModal isOpen={!!taskId} onOpenChange={onClose}>
      {/* Add your modal content here */}
      {taskId && <EditTaskFormWrapper taskId={taskId} onCancel={onClose}/>}
    </ResponsiveModal>
  )
}
export default EditTaskModal