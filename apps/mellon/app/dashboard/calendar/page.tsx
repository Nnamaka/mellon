"use client";

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment);

function Calender() {
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{height: 600}}
        // style={{height:}}
      />
    </div>
  )
}

export default Calender