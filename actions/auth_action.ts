'use server'
import { redirect } from 'next/navigation'
import {z} from "zod"
import { cookies } from 'next/headers'
import { backend_url } from '@/app/config/config'
import { toast } from 'sonner'
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Must be 6 or more digits" })
})

const loginAction = async (value: z.infer<typeof schema>)=>{
  //console.log(value)
  const res = await fetch((backend_url + "/api/user/login"),{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    credentials:'include',
    body:JSON.stringify({
      email:value.email,
      password:value.password
    })
  })
  //console.log(res)
  //console.log("response info: "+res.ok)
  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || 'Login failed');
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

export {loginAction, logoutAction}
