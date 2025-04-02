
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-edu-primary">EduNexus Hub</h1>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row items-center container mx-auto px-4 py-8">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Complete Educational Management System
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            An end-to-end platform for educational institutions, providing comprehensive tools for students, teachers, and administrators.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-primary">Timetable Management</h3>
                <p className="text-gray-600">Effortlessly manage and view class schedules.</p>
              </CardContent>
            </Card>
            
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-secondary">HR Module</h3>
                <p className="text-gray-600">Complete staff management and payroll system.</p>
              </CardContent>
            </Card>
            
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-accent">Inventory System</h3>
                <p className="text-gray-600">Track and manage resources and supplies.</p>
              </CardContent>
            </Card>
            
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-primary">Assignment Portal</h3>
                <p className="text-gray-600">Create, distribute, and grade assignments.</p>
              </CardContent>
            </Card>
            
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-secondary">Financial Management</h3>
                <p className="text-gray-600">Manage accounts, fees, and financial reports.</p>
              </CardContent>
            </Card>
            
            <Card className="edu-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 text-edu-accent">Online Exams</h3>
                <p className="text-gray-600">Create and conduct MCQ tests and exams.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex justify-center animate-slideUp" style={{ animationDelay: "0.2s" }}>
          <LoginForm />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">© 2023 EduNexus Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
