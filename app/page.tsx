'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(()=>{
    const verify = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/user/current', {
            method: 'GET',
            credentials: 'include', // Include credentials if needed
        });

        if (!response.ok) {
          router.push("/login")
        }

        const result = await response.json();
        console.log(result.data)
        setData(result.data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
      verify();
  },[router,data])
  return (
    <div>
      This is protected page
    </div>
  )
}
