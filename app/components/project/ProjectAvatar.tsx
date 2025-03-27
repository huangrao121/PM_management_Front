import { cn } from "@/app/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from "next/image"

interface ProjectAvatarProps{
  image?: string
  name: string
  className?: string
}

const ProjectAvatar = ({image, name, className}: ProjectAvatarProps)=>{
  if(image){
    return (
      <div className={cn(
        "size-7 relative rounded-md overflow-hidden",
        className
      )}>
        <Image src={image} alt={name} fill className="object-cover"/>
      </div>
    )
  }
  return(
    <Avatar className={cn(
      "size-7 rounded-none", className
    )}>
      <AvatarFallback className="text-white bg-blue-500 font-semibold text-md uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
export default ProjectAvatar