import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import {toast} from "sonner"
import { useRouter } from "next/navigation"
const useLogin = ()=>{
  const router = useRouter();
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (value: {email: string, password: string})=>{
      const response = await fetch(`http://localhost:8888/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(value)
      })
      if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed')
      }
      const res = await response.json()
      return res
    },
    onSuccess: () => {
      toast.success("Logged in successfully")
      router.push("/")
      queryClient.invalidateQueries({queryKey: ["user"]})
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to log in')
    },
  })
  return mutation
}

export {useLogin}