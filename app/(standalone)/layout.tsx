import Link from "next/link"
import Image from "next/image"
import UserButton from "@/features/components/user-button"
import { Button } from "@/components/ui/button"
import { cookies } from "next/headers"
import getCurrentUser from "../lib/getCurrentUser"
interface StandaloneLayoutProps {
  children: React.ReactNode
}

const StandaloneLayout = async ({children}:StandaloneLayoutProps)=>{
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  //console.log(token)
  const result = await getCurrentUser(token)
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="max-w-screen-2xl mx-auto p-5">
        <nav className="flex justify-between items-center h-[73px]">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={75} height={75}/>
          </Link>
          <UserButton user={result}></UserButton>
        </nav>
        <div className="flex flex-col items-center justify-center py-4">
          {children}
        </div>
      </div>
    </main>
  )
}

export default StandaloneLayout