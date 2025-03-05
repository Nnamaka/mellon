"use client";

import React, { useState } from "react";
import { Calendar, momentLocalizer, SlotInfo, Views } from "react-big-calendar";
import moment from "moment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";

const localizer = momentLocalizer(moment);

// Define types for better type safety
type Platform = 'x' | 'linkedin' | 'facebook' | 'bluesky';

interface NewPost {
  content: string;
  platform: Platform;
  date: Date | null;
  time: Date | null;
  scheduledFor?: Date;
}

// Custom toolbar component to remove "agenda" and "day" views

function Calender() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newPost, setNewPost] = useState<NewPost>({
    content: "",
    platform: "x",
    date: null,
    time: null,
  });

  // @ts-expect-error toolbar is intentionally made to dodge typescript linting
  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToCurrent = () => {
      toolbar.onNavigate("TODAY");
    };

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={goToBack}>
            Back
          </Button>
          <Button variant="outline" onClick={goToCurrent}>
            Today
          </Button>
          <Button variant="outline" onClick={goToNext}>
            Next
          </Button>
        </div>
        <span className="font-medium text-lg">{toolbar.label}</span>
        <div className="flex gap-2">
          <Button
            variant={toolbar.view === "month" ? "default" : "outline"}
            onClick={() => toolbar.onView("month")}
          >
            Month
          </Button>
          <Button
            variant={toolbar.view === "week" ? "default" : "outline"}
            onClick={() => toolbar.onView("week")}
          >
            Week
          </Button>
        </div>
      </div>
    );
  };

  // Event handler for day selection
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const startDate = slotInfo.start instanceof Date
    ? slotInfo.start
    : new Date(slotInfo.start);

    setSelectedDate(startDate);
    setNewPost(prevPost => ({
      ...prevPost,
      date: startDate,
      time: startDate,
    }));
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time
    if(!newPost.date || !newPost.time){
      console.error("Date or time is null");
      return;
    }


    const scheduledDateTime = new Date(newPost.date);
    const timeDate = new Date(newPost.time);
    scheduledDateTime.setHours(timeDate.getHours(), timeDate.getMinutes());

    const postData = {
      ...newPost,
      scheduledFor: scheduledDateTime,
    };

    console.log("Submitting post:", postData);
    // Here you would send this data to your API
    // savePost(postData);

    setIsModalOpen(false);
    setNewPost({
      content: "",
      platform: "x",
      date: null,
      time: null,
    });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        defaultView={Views.MONTH}
        views={["month", "week"]}
        // style={{height:}}
        components={{
          toolbar: CustomToolbar,
        }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        dayPropGetter={() => ({
          style: {
            cursor: "pointer",
          },
        })}
      />

      {/* Post Creation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Schedule Post for{" "}
              {selectedDate ? moment(selectedDate).format("MMMM D, YYYY") : ""}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="What would you like to post?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                required
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={newPost.platform}
                onValueChange={(value: Platform) =>
                  setNewPost({ ...newPost, platform: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">X (Twitter)</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="bluesky">Bluesky</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <DatePicker
                  date={newPost.date ? new Date(newPost.date) : null}
                  setDate={(date:Date | undefined) => setNewPost({ ...newPost, date: date || null })}
                />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <TimePicker
                  date={newPost.time ? new Date(newPost.time) : null}
                  setDate={(time: Date | undefined) => setNewPost({ ...newPost, time: time || null })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Schedule Post</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Calender;
