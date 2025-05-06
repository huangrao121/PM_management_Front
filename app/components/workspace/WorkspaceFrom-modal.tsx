'use client'

import ResponsiveModal from "../responsive/Responsive-modal"
import WorkspaceForm from "./WorkspaceForm"
import useWorkspaceForm from "@/features/zustand/FormStore"
const WorkspaceFormModal = ()=>{
  const {isOpen, onOpen, onClose, setIsOpen} = useWorkspaceForm()
  return (
    <ResponsiveModal isOpen={isOpen} onOpenChange={setIsOpen} >
      <WorkspaceForm onCancel={onClose}/>
    </ResponsiveModal>
  )
}

export default WorkspaceFormModal