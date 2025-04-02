
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon } from "lucide-react";

const PendingApprovalPage = () => {
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
      <main className="flex-1 flex flex-col items-center justify-center container mx-auto px-4 py-8">
        <Card className="w-full max-w-md mx-auto shadow-lg animate-fadeIn">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-yellow-100 p-3">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Account Pending Approval</CardTitle>
            <CardDescription className="text-center">
              Your account registration is being reviewed by an administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              You will be able to access the system once your account has been approved.
              This process may take some time.
            </p>
            <p className="text-sm text-muted-foreground">
              If you have any questions, please contact the administrator.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <Link to="/">Back to Login</Link>
            </Button>
          </CardFooter>
        </Card>
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

export default PendingApprovalPage;
