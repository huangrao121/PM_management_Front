"use client"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"

interface DateChooseProps{
  date: Date|undefined
  onChange: (date: Date|undefined)=>void
  className?: string
  placeholder?: string
}

const DateChoose = ({date, onChange, className, placeholder}: DateChooseProps)=>{
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start text-left font-normal px-3",
          !date && "text-muted-foreground",
          className
        )}>
          <CalendarIcon className="size-4 mr-2"/>
          {date ? format(date, "MM/dd/yyyy") : placeholder}
        </Button> 
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DateChoose;