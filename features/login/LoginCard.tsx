import { FcGoogle, } from "react-icons/fc"
import { FaApple, FaMicrosoft } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";

const LoginCard = ()=>{
  return (
     <Card className="w-full h-4/5 md:w-[500px] p-7 rounded-sm shadow-sm">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <Input placeholder="Email" required type="email" disabled={false}></Input>
          <Input placeholder="Password" required type="password" disabled={false}></Input>
          <Button className="w-full" size={"lg"}>Log In</Button>
        </form>
      </CardContent>
      <div className="pt-3 pb-8 px-7">
        <Separator/>
      </div>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <Button variant={"secondary"} className="w-full" size={"lg"}>
          <FcGoogle/>
          Google
        </Button>
        <Button variant={"secondary"} className="w-full" size={"lg"}>
          <FaMicrosoft/>
          Microsoft
        </Button>
        <Button variant={"secondary"} className="w-full" size={"lg"}>
          <FaApple/>
          Apple
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-3">
        <Link href={"/login"} className="text-blue-700 hover:underline">Forget Password</Link>
        <Separator orientation="vertical"/>
        <Link href={"/login"} className="text-blue-700 hover:underline">Create New Account</Link>
      </CardFooter>
     </Card>
  )
}

export default LoginCard