import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go"
import { IoSettingsOutline, IoSettings } from "react-icons/io5"
import { FaRegUser, FaUser } from "react-icons/fa6"
import Link from "next/link"
import cn from 'clsx'
const menu = [
  {
    label: "Home",
    href:"",
    icon: GoHome,
    activeIcon: GoHomeFill
  },
  {
    label: "My Tasks",
    href:"/tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill
  },
  {
    label: "Settings",
    href:"/settings",
    icon: IoSettingsOutline,
    activeIcon: IoSettings
  },
  {
    label: "Members",
    href:"/members",
    icon: FaRegUser,
    activeIcon: FaUser
  },
]

const NaviMenu = ()=>{
  return (
    <ul className="flex flex-col gap-3">
      {menu.map((item)=>{
        const isActive = false;
        const Icon = isActive? item.activeIcon : item.icon
        return (
          <Link key={item.label} href={item.href}>
            <div className={cn(
              "flex items-center gap-2 p-2 rounded-md font-medium hover:text-primary transition text-neutral-500",
              isActive && "bg-white shadow-sm hover:opacity-80"
            )}>
              <Icon className="size-5 text-neutral-600"/>
             {item.label} 
            </div>         
          </Link>
        )
      })}
    </ul>
  )
} 

export default NaviMenu