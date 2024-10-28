
export const useCurrentUser = async ()=>{
  const res = await fetch("http://localhost:9001/api/user/current",{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    },
    credentials:'include',
  })
  if(!res.ok){
    return null
  }
  console.log("successful")
}