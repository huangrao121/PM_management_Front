'use client'
import { FcGoogle, } from "react-icons/fc"
import { loginAction} from "@/actions/auth_action";
import { schema } from '@/app/schema/userSchema'
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
import { toast } from "sonner";


const LoginCard = ()=>{

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  // const onSubmit = 
  // async (value: z.infer<typeof schema>)=>{
  //   'use server'
  //   //console.log(value)
  //   const res = await fetch("http://localhost:9001/api/user/login",{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json',
  //     },
  //     credentials:'include',
  //     body:JSON.stringify({
  //       email:value.email,
  //       password:value.password
  //     })
  //   })
  //   //console.log("response info: "+res.ok)
  //   if(!res.ok){
  //     const errorData = await res.json();
  //     throw new Error(errorData.message || 'Login failed');
  //   }
  //   router.push("/")
  // }
  const submitLogin =(data: z.infer<typeof schema>)=>{
    try{
      loginAction(data)
      toast.success("Logged in successfully")
    }catch{
      toast.error("Logged in failed")
    }
  }
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
            <Button type="submit" className="w-full" size={"lg"}>Log In</Button>
          </form>
        </Form>
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
        <Link href={"/signup"} className="text-blue-700 hover:underline">Create New Account</Link>
      </CardFooter>
     </Card>
  )
}

export default LoginCard