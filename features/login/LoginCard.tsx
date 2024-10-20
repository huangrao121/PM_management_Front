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


const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more digits" })
})

const LoginCard = ()=>{
  const form = useForm<z.infer<typeof schema>>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (value: z.infer<typeof schema>)=>{
    console.log({value})
  }

  return (
     <Card className="w-full h-4/5 md:w-[500px] p-7 rounded-sm shadow-sm">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
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