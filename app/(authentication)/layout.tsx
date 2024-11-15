import Image from "next/image"
interface AuthenticationLOProps {
   children: React.ReactNode
}

const AuthenticationLO = ({children}:AuthenticationLOProps)=>{
  return(
    <main className="min-h-screen bg-neutral-200">
      <div className="h-screen flex flex-col justify-center gap-10 items-center mx-auto p-4 max-w-screen-2xl">
        <nav>
          <Image src={"/logo.svg"} width={100} height={100} alt="logo"/>
        </nav>
        {children}
      </div>
    </main>
  )
}
export default AuthenticationLO