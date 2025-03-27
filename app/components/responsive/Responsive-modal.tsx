import { useMedia } from "react-use"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

interface ResponsiveModalProps {
  children: React.ReactNode,
  isOpen: boolean,
  //onOpenChange: (open: boolean)=>Promise<URLSearchParams>
  onOpenChange: (open:boolean)=>void
}

const ResponsiveModal = ({children, isOpen, onOpenChange}:ResponsiveModalProps) => {
  const isDesktop = useMedia('(min-width: 768px)', true)

  if(isDesktop){
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent 
          className="
            w-full 
            sm:max-w-lg 
            p-0 
            border-none 
            overflow-y-auto 
            hide-scrollbar 
            max-[85vh]"
        >
          <DialogTitle className="hidden"/>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent 
        className="
          overflow-y-auto 
          hide-scrollbar 
          max-[85vh]"
      >
        {children}
      </DrawerContent>
    </Drawer>
  )
  
}

export default ResponsiveModal