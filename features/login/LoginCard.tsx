'use client'
import { FcGoogle, } from "react-icons/fc"
import { schema } from '@/app/schema/userSchema'
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {useLogin} from "@/features/login/api_request/useLogin"
import {useEffect} from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
const LoginCard = ()=>{
  const router = useRouter()
  const params = useSearchParams()
  const {mutate, isPending} = useLogin()
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });


  const submitLogin =(data: z.infer<typeof schema>)=>{
    mutate(data)
  }

  const handleGoogleLogin = async ()=>{
    window.location.href=`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/OAuth/google/login`
  }

  // useEffect(()=>{
  //   const error = params.get("error")
  //   if (error){
  //     toast.error(error)
  //   }
  // },[])

  return (
     <Card className="w-full h-4/5 md:w-[500px] p-7 rounded-sm shadow-sm">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(data => {submitLogin(data)})} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email"></Input>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field})=>(
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" ></Input>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            {/* <Input placeholder="Email" required type="email" disabled={false}></Input> */}
            {/* <Input placeholder="Password" required type="password" disabled={false}></Input> */}
            <Button disabled={isPending} type="submit" className="w-full" size={"lg"}>Log In</Button>
          </form>
        </Form>
      </CardContent>
      <div className="pt-3 pb-8 px-7">
        <Separator/>
      </div>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <Button disabled={isPending} variant={"secondary"} className="w-full" size={"lg"} onClick={handleGoogleLogin}>
          <FcGoogle/>
          Google
        </Button>
        <Button disabled={isPending} variant={"secondary"} className="w-full" size={"lg"}>
          <FaGithub/>
          Github
        </Button>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-3">
        <Link href={"/login"} className="text-blue-700 hover:underline">Forget Password</Link>
        <Separator orientation="vertical"/>
        <Link href={"/signup"} className="text-blue-700 hover:underline">Create New Account</Link>
      </CardFooter>
     </Card>
  )
}

export default LoginCard