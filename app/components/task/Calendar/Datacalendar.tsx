"use client"
import {Button} from "@/components/ui/button"
import { TaskInfo } from "@/app/lib/types/taskType"
import { 
  Calendar, 
  dateFnsLocalizer,
  Event as CalendarEvent
} from "react-big-calendar"
import { Calendar as CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { format, parse, startOfWeek, getDay, subMonths, addMonths } from "date-fns"
import {enCA} from "date-fns/locale/en-CA"
import { useState } from "react"

import EventCard from "./EventCard"
import DateChoose from "@/app/components/task/DateChoose"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "./data_calendar.css";

interface DataCalendarProps{
  data: TaskInfo[]
}

interface CustomToolbarProps{
  date: Date
  onNavigate: (action: "PREV"|"TODAY"|"NEXT") => void
  onChange: (date: Date | undefined) => void
}


const locales = {
  "en-CA": enCA
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const CustomToolbar = ({date, onNavigate, onChange}: CustomToolbarProps)=>{


  return (
    <div className="flex relative mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start">
      <Button
        onClick={()=>onNavigate("PREV")}
        variant={"outline"}
        size={"icon"}
        className="flex items-center"
      >
        <ChevronLeftIcon className="size-4"/>
      </Button>
      {/* <div className="flex items-center border rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto relative"> */}
        <DateChoose
          className="px-3 py-2 h-8 w-[150]"
          date={date}
          onChange={onChange}
        />
      {/* </div> */}
      <Button
        onClick={()=>onNavigate("NEXT")}
        variant={"outline"}
        size={"icon"}
        className="flex items-center"
      >
        <ChevronRightIcon className="size-4"/>
      </Button>
    </div>
  )
}

const DataCalendar = ({data}: DataCalendarProps)=>{
  const [value, setValue] = useState<Date>(()=>(
    data.length > 0? new Date(data[0].due_date) : new Date() 
  ))

  const handleNavigate = (action: "PREV"|"NEXT"|"TODAY")=>{
    if(action === "PREV"){
      setValue(subMonths(value, 1))
    }else if(action === "NEXT"){
      setValue(addMonths(value, 1))
    }else{
      setValue(new Date())
    }
  }
  
  const chooseNavigate = (date: Date | undefined) => {
    if (date) {
      setValue(date)
    }
  }

  const events = data.map((task)=>({
    start: new Date(task.due_date),
    end: new Date(task.due_date),
    title: task.name,
    project: task.project_name,
    assignee: task.assignee_name,
    status: task.status,
    id: task.id
  }))

  return (
   <div className="h-full">
     <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      max={new Date(new Date().setFullYear(new Date().getFullYear()+1))}
      formats={{
        weekdayFormat: (date, culture, localizer) => 
          localizer?.format(date, "EEE", culture) ?? ""
      }}
      components={{
        eventWrapper: ({event})=>(
          <EventCard
            id={event.id}
            title={event.title}
            project={event.project}
            assignee={event.assignee}
            status={event.status}
          />
        ),
        toolbar: ()=>(
          <CustomToolbar date={value} onNavigate={handleNavigate} onChange={chooseNavigate}/>
        )
      }}
     />
   </div>
  )
}

export default DataCalendar