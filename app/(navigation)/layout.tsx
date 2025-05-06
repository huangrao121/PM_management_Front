import { redirect } from "next/navigation"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import WorkspaceFormModal from "../components/workspace/WorkspaceFrom-modal"
import ProjectCreateModal from "../components/project/ProjectForm-modal"
import TaskFormModal from "../components/task/TaskFormModal"
import EditTaskModal from "../components/task/EditTaskModal"
import getCurrentUser from "../lib/getCurrentUser"
const NaviLayout = async ({children}: {children: React.ReactNode})=>{
  return (
    <div className="min-h-screen">
      <WorkspaceFormModal/>
      <ProjectCreateModal/>
      <TaskFormModal/>
      <EditTaskModal/>
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[240px] h-full overflow-y-auto">
          <Sidebar/>
        </div>
        <div className="lg:pl-[240px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar/>
            <main className="h-full py-8 px-6 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NaviLayout