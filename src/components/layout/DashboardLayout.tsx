
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: ReactNode;
  userType: "student" | "teacher" | "admin";
  pageTitle?: string;
}

const DashboardLayout = ({ children, userType, pageTitle = "Dashboard" }: DashboardLayoutProps) => {
  const { profile, signOut } = useAuth();
  
  return (
    <div className="min-h-screen bg-edu-background flex">
      <AppSidebar userType={userType} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white h-16 shadow-sm flex items-center px-4 sticky top-0 z-30">
          <div className="container max-w-full mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
            
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[calc(80vh-10rem)] overflow-y-auto">
                    <DropdownMenuItem>
                      <div className="flex flex-col">
                        <span className="font-medium">New Assignment Posted</span>
                        <span className="text-sm text-muted-foreground">Math Assignment due Friday</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div className="flex flex-col">
                        <span className="font-medium">Upcoming Test</span>
                        <span className="text-sm text-muted-foreground">Science test on Thursday</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 rounded-full" size="icon">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-edu-primary text-white">
                        {profile?.first_name?.charAt(0) || userType.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {profile ? `${profile.first_name} ${profile.last_name}` : "User"}
                    <p className="text-xs text-muted-foreground mt-1 capitalize">{profile?.role || userType}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${userType}/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/${userType}/settings`}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className={cn("flex-1 p-4 sm:p-6 overflow-y-auto")}>
          <div className="container mx-auto pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
