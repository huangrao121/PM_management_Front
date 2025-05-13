import { useQuery } from "@tanstack/react-query"


const useGoogleLogin = ()=>{
  return useQuery({
    queryKey:["googleLogin"],
    queryFn: async ()=>{
      const response = await fetch(`http://localhost:8888/api/OAuth/google/login`,{
        method:"GET",
        credentials:"include"
      })
      if(!response.ok){
        throw new Error("Failed to login")
      }
      const res = await response.json()
      if(res.response_key != "SUCCESS"){
        throw new Error("Failed to login")
      }
      return res.data
    }
  })
}

export {useGoogleLogin}