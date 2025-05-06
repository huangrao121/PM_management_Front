import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/app/lib/utils"

interface MembersAvatarProps {
  name: string
  className? : string
  fallbackClassName?: string
}

const MemberAvatar = ({
  name,
  className,
  fallbackClassName
}:MembersAvatarProps)=>{
  return (
    <Avatar className={cn("size-5 transition border border-neutral-100", className)}>
      <AvatarFallback className={cn(
        "bg-indigo-500 font-medium text-neutral-100 flex items-center justify-center",
        fallbackClassName
      )}>
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
}

export default MemberAvatar