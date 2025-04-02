
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, BookOpen, Clock, FileText, FileQuestion, ChevronRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  // Sample data - in a real app, this would come from an API
  const upcomingAssignments = [
    { id: 1, title: "Math Problem Set", subject: "Mathematics", dueDate: "2023-09-15", status: "pending" },
    { id: 2, title: "History Essay", subject: "History", dueDate: "2023-09-18", status: "pending" },
    { id: 3, title: "Science Lab Report", subject: "Science", dueDate: "2023-09-20", status: "pending" },
  ];
  
  const upcomingExams = [
    { id: 1, title: "Mid-term Exam", subject: "Mathematics", date: "2023-09-25", duration: "2 hours" },
    { id: 2, title: "Chapter Quiz", subject: "Physics", date: "2023-09-22", duration: "45 minutes" },
  ];
  
  const announcements = [
    { id: 1, title: "School Event Next Week", content: "Annual school event on Friday. All students are required to participate.", date: "2023-09-10" },
    { id: 2, title: "Library Hours Change", content: "Library will close early at 4 PM starting next week.", date: "2023-09-09" },
  ];
  
  const timetable = [
    { id: 1, time: "08:00 - 09:00", subject: "Mathematics", teacher: "Prof. Johnson", room: "A101" },
    { id: 2, time: "09:15 - 10:15", subject: "Science", teacher: "Dr. Smith", room: "B202" },
    { id: 3, time: "10:30 - 11:30", subject: "History", teacher: "Mrs. Davis", room: "C303" },
    { id: 4, time: "12:00 - 13:00", subject: "Lunch Break", teacher: "", room: "Cafeteria" },
    { id: 5, time: "13:15 - 14:15", subject: "English", teacher: "Mr. Wilson", room: "D404" },
    { id: 6, time: "14:30 - 15:30", subject: "Physical Education", teacher: "Coach Brown", room: "Gym" },
  ];
  
  return (
    <DashboardLayout userType="student" pageTitle="Student Dashboard">
      <div className="grid grid-cols-1 gap-6 animate-fadeIn">
        {/* Welcome card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back, Student</h2>
                <p className="text-gray-600 mt-1">Here's what's happening with your education today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button className="bg-edu-primary">View Schedule</Button>
                <Button variant="outline">View Progress</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Today's Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <CalendarRange className="mr-2 h-5 w-5 text-edu-primary" />
                  Today's Schedule
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-edu-primary">
                  Full Timetable <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Your classes for today, Monday, Sep 13</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timetable.map((period) => (
                  <div key={period.id} className="flex items-center p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div className="mr-4 text-center">
                      <div className="text-sm font-medium text-gray-500">{period.time.split('-')[0]}</div>
                      <div className="text-xs text-gray-400">to</div>
                      <div className="text-sm font-medium text-gray-500">{period.time.split('-')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{period.subject}</div>
                      {period.teacher && (
                        <div className="text-sm text-gray-500">
                          {period.teacher} • Room {period.room}
                        </div>
                      )}
                    </div>
                    {period.subject !== "Lunch Break" && (
                      <div className="flex-shrink-0">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Materials</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Announcements */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Bell className="mr-2 h-5 w-5 text-edu-primary" />
                Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div className="font-medium">{announcement.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {announcement.content}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      Posted on {announcement.date}
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-edu-primary">
                  View All Announcements
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Assignments and Exams */}
        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="assignments" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="assignments" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Assignments
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="flex items-center">
                    <FileQuestion className="mr-2 h-4 w-4" />
                    Upcoming Exams
                  </TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="text-edu-primary">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <TabsContent value="assignments" className="mt-4">
                <div className="space-y-4">
                  {upcomingAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-500">{assignment.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Due: {assignment.dueDate}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="exams" className="mt-4">
                <div className="space-y-4">
                  {upcomingExams.map((exam) => (
                    <div key={exam.id} className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="font-medium">{exam.title}</div>
                        <div className="text-sm text-gray-500">{exam.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">Date: {exam.date}</div>
                        <div className="text-sm text-gray-500">Duration: {exam.duration}</div>
                        <Button size="sm" variant="outline" className="mt-2">
                          Study Materials
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
