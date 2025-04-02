
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  ShoppingBag, 
  ChevronRight, 
  DollarSign, 
  BarChart4,
  BookOpen,
  CalendarRange,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // Sample data for admin dashboard
  const recentUsers = [
    { id: 1, name: "Jane Cooper", role: "Teacher", department: "Science", joinDate: "2023-09-01" },
    { id: 2, name: "Robert Fox", role: "Student", class: "Grade 10-A", joinDate: "2023-09-05" },
    { id: 3, name: "Emily Wilson", role: "Admin Staff", department: "IT Support", joinDate: "2023-09-08" },
  ];
  
  const inventoryAlerts = [
    { id: 1, item: "Science Lab Equipment", quantity: 5, threshold: 10, status: "Low Stock" },
    { id: 2, item: "Classroom Chairs", quantity: 8, threshold: 15, status: "Low Stock" },
    { id: 3, item: "Whiteboard Markers", quantity: 12, threshold: 20, status: "Low Stock" },
  ];
  
  const financialSummary = [
    { id: 1, category: "Tuition Fees", amount: 85000, status: "Received" },
    { id: 2, category: "Staff Salaries", amount: 45000, status: "Paid" },
    { id: 3, category: "Operational Expenses", amount: 12000, status: "Paid" },
    { id: 4, category: "Outstanding Fees", amount: 7500, status: "Pending" },
  ];
  
  return (
    <DashboardLayout userType="admin" pageTitle="Admin Dashboard">
      <div className="grid grid-cols-1 gap-6 animate-fadeIn">
        {/* Welcome card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back, Admin</h2>
                <p className="text-gray-600 mt-1">Here's the latest information for your institution.</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button className="bg-edu-primary">Generate Reports</Button>
                <Button variant="outline">System Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-10 w-10 text-edu-primary" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Teachers</div>
                  <div className="text-2xl font-bold">42</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-10 w-10 text-edu-secondary" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Students</div>
                  <div className="text-2xl font-bold">650</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-10 w-10 text-edu-accent" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Classes</div>
                  <div className="text-2xl font-bold">24</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-10 w-10 text-edu-success" />
                <div>
                  <div className="text-sm font-medium text-gray-500">Revenue</div>
                  <div className="text-2xl font-bold">$92,500</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Management */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5 text-edu-primary" />
                  User Management
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-edu-primary">
                  View All Users <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Recently added users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-edu-primary flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">
                          {user.role} • {user.department || user.class}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Joined {user.joinDate}</div>
                      <Button size="sm" variant="ghost" className="mt-1">View Profile</Button>
                    </div>
                  </div>
                ))}
                <div className="flex space-x-3">
                  <Button className="flex-1" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Teacher
                  </Button>
                  <Button className="flex-1" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Student
                  </Button>
                  <Button className="flex-1" size="sm">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Staff
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Financial Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart4 className="mr-2 h-5 w-5 text-edu-primary" />
                Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialSummary.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border transition-colors hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{item.category}</div>
                      <div className={`text-sm font-medium ${
                        item.status === "Received" 
                          ? "text-edu-success" 
                          : item.status === "Pending" 
                            ? "text-edu-warning" 
                            : "text-edu-error"
                      }`}>
                        ${item.amount.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{item.status}</div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  Detailed Financial Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Modules Overview */}
        <Card>
          <CardHeader className="pb-3">
            <Tabs defaultValue="inventory" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="inventory" className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Inventory
                  </TabsTrigger>
                  <TabsTrigger value="schedule" className="flex items-center">
                    <CalendarRange className="mr-2 h-4 w-4" />
                    Schedules
                  </TabsTrigger>
                  <TabsTrigger value="academics" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Academics
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="inventory" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Inventory Alerts</h3>
                    <Button variant="outline" size="sm">Manage Inventory</Button>
                  </div>
                  
                  {inventoryAlerts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{item.item}</div>
                        <div className="text-sm text-gray-500">
                          Quantity: {item.quantity} (Threshold: {item.threshold})
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          {item.status}
                        </div>
                        <Button size="sm" className="mt-2">Reorder</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Master Schedule Management</h3>
                    <Button variant="outline" size="sm">View Calendar</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-primary flex items-center justify-center text-white">
                          <CalendarRange size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Class Schedules</div>
                          <div className="text-sm text-gray-500">Manage and view class timetables</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-secondary flex items-center justify-center text-white">
                          <Users size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Teacher Schedules</div>
                          <div className="text-sm text-gray-500">Manage teacher assignments and hours</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-accent flex items-center justify-center text-white">
                          <BookOpen size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Examination Schedule</div>
                          <div className="text-sm text-gray-500">Plan and manage exam timetables</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="academics" className="mt-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Academic Administration</h3>
                    <Button variant="outline" size="sm">Academic Reports</Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-primary flex items-center justify-center text-white">
                          <FileText size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Curriculum Management</div>
                          <div className="text-sm text-gray-500">Update and manage course content</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-secondary flex items-center justify-center text-white">
                          <BarChart4 size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Performance Analytics</div>
                          <div className="text-sm text-gray-500">View student and class performance data</div>
                        </div>
                      </div>
                    </Button>
                    
                    <Button className="w-full justify-start text-left" variant="outline">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-edu-accent flex items-center justify-center text-white">
                          <FileText size={16} />
                        </div>
                        <div>
                          <div className="font-medium">Examination Management</div>
                          <div className="text-sm text-gray-500">Create and manage exams</div>
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
