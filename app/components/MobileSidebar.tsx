import { MdMenu } from "react-icons/md";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./Sidebar";
const MobileSidebar = ()=>{
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="lg:hidden">
          <MdMenu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar/>
      </SheetContent>
    </Sheet>
    
  )
}
export default MobileSidebar