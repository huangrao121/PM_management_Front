import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function Home() {
  return (
    <div>
      <Input/>
      <br></br>
      <Button variant={"outline"} size={"lg"}>
        This is button
      </Button>
      <Button variant={"destructive"}>
        destructive
      </Button>
      <Button variant={"outline"}>
        outline
      </Button>
      <Button variant={"secondary"}>
        secondary
      </Button>
      <Button variant={"ghost"}>
        ghost
      </Button>
      <Button variant={"link"}>
        Link
      </Button>
    </div>
  )
}
