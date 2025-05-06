"use client"
import ResponsiveModal from "../responsive/Responsive-modal";
import CreateTaskFormWrapper from "./CreateTaskFormWrapper";
import useCreateTaskModal from "@/features/zustand/useCreateTaskModal";


const TaskFormModal = () => {
  const {isOpen, onClose, setIsOpen} = useCreateTaskModal()
  return (
    <ResponsiveModal isOpen={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={onClose}/>
    </ResponsiveModal>
  )
}

export default TaskFormModal;