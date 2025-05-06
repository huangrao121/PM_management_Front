'use client'

import ResponsiveModal from "../responsive/Responsive-modal"
import ProjectForm from "./ProjectForm"
import useCreateProjectModal from "@/features/zustand/useCreateProjectModal"
const ProjectCreateModal = ()=>{
  const {isOpen, onClose, setIsOpen} = useCreateProjectModal()
  return (
    <ResponsiveModal isOpen={isOpen} onOpenChange={setIsOpen} >
      <ProjectForm onCancel={onClose}/>
    </ResponsiveModal>
  )
}

export default ProjectCreateModal