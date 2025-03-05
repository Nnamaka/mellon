"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimePickerProps {
  date: Date | null;
  setDate: (date: Date | undefined) => void;
}

export function TimePicker({ date, setDate }: TimePickerProps) {
  // Get current time values or defaults
  const hours = date ? date.getHours() : 12;
  const minutes = date ? date.getMinutes() : 0;
  
  const handleHourChange = (value: string) => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(parseInt(value, 10));
    setDate(newDate);
  };
  
  const handleMinuteChange = (value: string) => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setMinutes(parseInt(value, 10));
    setDate(newDate);
  };

  // Generate hours and minutes options
  const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "h:mm a")
          ) : (
            <span>Pick a time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Hour</span>
            <Select value={hours.toString()} onValueChange={handleHourChange}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Hour" />
              </SelectTrigger>
              <SelectContent>
                {hoursOptions.map((hour) => (
                  <SelectItem key={hour} value={hour.toString()}>
                    {hour.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-medium mb-1">Minute</span>
            <Select value={minutes.toString()} onValueChange={handleMinuteChange}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {minutesOptions.map((minute) => (
                  <SelectItem key={minute} value={minute.toString()}>
                    {minute.toString().padStart(2, '0')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}