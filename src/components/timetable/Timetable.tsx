
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface TimeSlot {
  time: string;
  subject?: string;
  teacher?: string;
  location?: string;
  class?: string;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

interface TimetableProps {
  schedules: DaySchedule[];
  viewType: "student" | "teacher" | "admin";
  title?: string;
  description?: string;
  showFilters?: boolean;
}

const Timetable = ({ 
  schedules, 
  viewType, 
  title = "Weekly Timetable", 
  description = "Your class schedule for the week", 
  showFilters = true 
}: TimetableProps) => {
  const [selectedDay, setSelectedDay] = useState(schedules[0].day);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(undefined);
  
  // Sample data for filters
  const classes = ["Grade 9-A", "Grade 9-B", "Grade 10-A", "Grade 10-B", "Grade 11-A", "Grade 11-B"];
  const teachers = ["Prof. Johnson", "Dr. Smith", "Mrs. Davis", "Mr. Wilson", "Ms. Anderson"];
  
  const renderTimeSlot = (slot: TimeSlot) => {
    if (!slot.subject) {
      return (
        <div className="h-full flex items-center justify-center p-2 text-gray-400 italic">
          Free Period
        </div>
      );
    }
    
    return (
      <div className="p-3 h-full">
        <div className="font-medium">{slot.subject}</div>
        {viewType === "student" && slot.teacher && (
          <div className="text-sm text-gray-500">{slot.teacher}</div>
        )}
        {viewType === "teacher" && slot.class && (
          <div className="text-sm text-gray-500">{slot.class}</div>
        )}
        {slot.location && (
          <div className="text-sm text-gray-500">Room: {slot.location}</div>
        )}
      </div>
    );
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              {viewType === "admin" && (
                <>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls, index) => (
                        <SelectItem key={index} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher, index) => (
                        <SelectItem key={index} value={teacher}>{teacher}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={schedules[0].day} value={selectedDay} onValueChange={setSelectedDay}>
          <TabsList className="grid grid-cols-5 mb-6">
            {schedules.map((day) => (
              <TabsTrigger key={day.day} value={day.day}>
                {day.day}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {schedules.map((day) => (
            <TabsContent key={day.day} value={day.day} className="mt-0">
              <div className="bg-white rounded-md overflow-hidden">
                <div className="grid grid-cols-1 divide-y">
                  {day.slots.map((slot, index) => (
                    <div key={index} className="flex items-stretch">
                      <div className="w-24 flex-shrink-0 bg-gray-50 p-3 flex flex-col justify-center items-center border-r">
                        <div className="text-sm font-medium">{slot.time.split('-')[0]}</div>
                        <div className="text-xs text-gray-500">to</div>
                        <div className="text-sm font-medium">{slot.time.split('-')[1]}</div>
                      </div>
                      <div className="flex-1 border-l border-gray-100">
                        {renderTimeSlot(slot)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Timetable;
