
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, Users, FileText, Clock, BookOpen, ChevronRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const TeacherDashboard = () => {
  // Sample data for a teacher
  const upcomingClasses = [
    { id: 1, time: "09:15 - 10:15", class: "Grade 10-A", subject: "Mathematics", room: "A101" },
    { id: 2, time: "11:30 - 12:30", class: "Grade 9-B", subject: "Mathematics", room: "B202" },
    { id: 3, time: "14:15 - 15:15", class: "Grade 11-C", subject: "Mathematics", room: "C303" },
  ];
  
  const activeAssignments = [
    { id: 1, title: "Algebraic Equations", class: "Grade 10-A", dueDate: "2023-09-15", submitted: 18, total: 25 },
    { id: 2, title: "Geometry Problems", class: "Grade 9-B", dueDate: "2023-09-18", submitted: 15, total: 28 },
    { id: 3, title: "Calculus Basics", class: "Grade 11-C", dueDate: "2023-09-20", submitted: 12, total: 22 },
  ];
  
  const upcomingExams = [
    { id: 1, title: "Mid-term Exam", class: "Grade 10-A", date: "2023-09-25", status: "Published" },
    { id: 2, title: "Chapter Quiz", class: "Grade 9-B", date: "2023-09-22", status: "Draft" },
  ];
  
  const announcements = [
    { id: 1, title: "Staff Meeting", content: "Staff meeting on Friday at 3 PM in the conference room.", date: "2023-09-10" },
    { id: 2, title: "Curriculum Update", content: "New curriculum guidelines available for review.", date: "2023-09-09" },
  ];
  
  return (
    <DashboardLayout userType="teacher" pageTitle="Teacher Dashboard">
      <div className="grid grid-cols-1 gap-6 animate-fadeIn">
        {/* Welcome card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back, Professor</h2>
                <p className="text-gray-600 mt-1">Here's what's on your schedule today.</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button className="bg-edu-primary">Create Assignment</Button>
                <Button variant="outline">Create Exam</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-10 w-10 text-edu-primary" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Total Students</div>
                  <div className="text-2xl font-bold">75</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-10 w-10 text-edu-secondary" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Classes</div>
                  <div className="text-2xl font-bold">3</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-10 w-10 text-edu-accent" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Assignments</div>
                  <div className="text-2xl font-bold">12</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-10 w-10 text-edu-error" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Hours Today</div>
                  <div className="text-2xl font-bold">6</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Today's Schedule and Announcements */}
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
                {upcomingClasses.map((period) => (
                  <div key={period.id} className="flex items-center p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div className="mr-4 text-center">
                      <div className="text-sm font-medium text-gray-500">{period.time.split('-')[0]}</div>
                      <div className="text-xs text-gray-400">to</div>
                      <div className="text-sm font-medium text-gray-500">{period.time.split('-')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{period.subject}</div>
                      <div className="text-sm text-gray-500">
                        {period.class} • Room {period.room}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Materials</Button>
                        <Button size="sm">Take Attendance</Button>
                      </div>
                    </div>
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
                <Button variant="outline" size="sm" className="w-full">
                  Post Announcement
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
                    <BookOpen className="mr-2 h-4 w-4" />
                    Upcoming Exams
                  </TabsTrigger>
                </TabsList>
                <Button variant="ghost" size="sm" className="text-edu-primary">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <TabsContent value="assignments" className="mt-4">
                <div className="space-y-4">
                  {activeAssignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 rounded-lg border transition-colors hover:bg-gray-50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div>
                          <div className="font-medium">{assignment.title}</div>
                          <div className="text-sm text-gray-500">{assignment.class} • Due: {assignment.dueDate}</div>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 sm:mt-0">
                          View Submissions
                        </Button>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500">Submission Progress</span>
                          <span className="text-sm font-medium">{assignment.submitted}/{assignment.total} ({Math.round((assignment.submitted / assignment.total) * 100)}%)</span>
                        </div>
                        <Progress value={(assignment.submitted / assignment.total) * 100} className="h-2" />
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
                        <div className="text-sm text-gray-500">{exam.class} • Date: {exam.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {exam.status}
                        </div>
                        <div className="mt-2">
                          <Button size="sm">
                            {exam.status === "Draft" ? "Edit Exam" : "View Details"}
                          </Button>
                        </div>
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

export default TeacherDashboard;
