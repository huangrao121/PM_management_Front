'use server'
import { redirect } from 'next/navigation'
import {z} from "zod"
import { cookies } from 'next/headers'
import { backend_url } from '@/app/config/config'
import { toast } from 'sonner'
import { signupSchema, schema } from '@/app/schema/userSchema'
// const schema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z.string().min(6, { message: "Must be 6 or more digits" })
// })

// const signupSchema = z.object({
//   email:z.string().email({ message: "Invalid email address" }),
//   password:z.string().min(6, { message: "Must be 6 or more digits" }),
//   confirmPassword:z.string().min(6, { message: "Must be 6 or more digits" })
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
//   path: ["confirmPassword"], // The path where the error message should be shown
// });

const signupAction = async (value: z.infer<typeof signupSchema>)=>{
  const res = await fetch((backend_url+"/api/user/signup"), {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    credentials:'include',
    body: JSON.stringify(value)
  })

  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || 'Signup failed');
  }else{
    const {headers} = res
    const setCookieHeader = headers.get('set-cookie'); // Adjust the header name as per your backend's response
  
    // Step 3: Set the cookie in Next.js using the 'cookies()' API
    if (setCookieHeader) {
      // Assuming the header contains the cookie value directly, like "auth_token=someTokenValue; Path=/; HttpOnly"
      const cookieValue = setCookieHeader.split(';')[0].split('=')[1]; // Extract the cookie value
      const expire = setCookieHeader.split(';')[1].split('=')[1]
      //console.log("cookie is: " +cookieValue + " expire is: "+expire)
      cookies().set({
        name: 'token',
        value: cookieValue,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: parseInt(expire), // 2 hrs
      });
    }
    redirect('/')
  }
}


const logoutAction = ()=>{
  cookies().delete('token')
  redirect('/login')
}

export {logoutAction, signupAction}
