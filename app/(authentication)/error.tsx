"use client"

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error(){
  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertTriangle className="size-10 text-red-500"/>
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-sm text-gray-500">Please try again later</p>
      <Button variant="secondary" size="md" asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  )
}