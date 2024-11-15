import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import NaviMenu from "./NaviMenu"
const Sidebar = ()=>{
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link className='flex items-center justify-start gap-4' href='/'>
        <Image src={"/logo.svg"} width={50} height={50} alt="logo"/>
        <p>PMS</p>
      </Link>
      <Separator orientation="horizontal" className="mt-3"/>
      <NaviMenu/>
    </aside>
  )
}

export default Sidebar  