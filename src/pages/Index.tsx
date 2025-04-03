
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const { user, isAdmin, isTeacher, isStudent, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-10 px-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edu Nexus Hub</h1>
          <div className="flex gap-4">
            {user ? (
              <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!user && (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Edu Nexus Hub</CardTitle>
                <CardDescription>
                  A platform for students and teachers to connect
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Please login or register to access the platform. New accounts require admin approval.
                </p>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage users and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  As an admin, you can approve or reject user registrations and manage the platform.
                </p>
                <Button asChild>
                  <Link to="/admin">User Management</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {isTeacher && (
            <Card>
              <CardHeader>
                <CardTitle>Teacher Dashboard</CardTitle>
                <CardDescription>
                  Manage your classes and students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Welcome, teacher! Your dashboard is coming soon.</p>
              </CardContent>
            </Card>
          )}

          {isStudent && (
            <Card>
              <CardHeader>
                <CardTitle>Student Dashboard</CardTitle>
                <CardDescription>
                  Access your courses and assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Welcome, student! Your dashboard is coming soon.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
