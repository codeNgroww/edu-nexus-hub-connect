import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarRange, 
  FileText, 
  ClipboardList, 
  Users, 
  ShoppingBag, 
  Calculator, 
  FileQuestion, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  subMenu?: { label: string; to: string }[];
}

const SidebarLink = ({ to, icon, label, isActive, onClick, subMenu }: SidebarLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleSubmenu = (e: React.MouseEvent) => {
    if (subMenu && subMenu.length > 0) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };
  
  return (
    <div className="mb-1">
      <Link
        to={subMenu && subMenu.length > 0 ? "#" : to}
        className={cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-md w-full",
          isActive && !subMenu 
            ? "bg-sidebar-accent text-white" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        )}
        onClick={(e) => {
          handleToggleSubmenu(e);
          onClick?.();
        }}
      >
        <span className="mr-3 text-lg">{icon}</span>
        <span className="flex-1">{label}</span>
        {subMenu && subMenu.length > 0 && (
          <span className="ml-auto">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </span>
        )}
      </Link>
      
      {subMenu && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {subMenu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              onClick={onClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

interface LinkItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  subMenu?: { label: string; to: string }[];
}

interface AppSidebarProps {
  userType: "student" | "teacher" | "admin";
}

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const closeSidebarIfMobile = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const commonLinks: LinkItem[] = [
    { to: `/${userType}-dashboard`, icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: `/${userType}/timetable`, icon: <CalendarRange size={20} />, label: "Timetable" },
  ];
  
  const studentLinks: LinkItem[] = [
    { to: "/student/assignments", icon: <FileText size={20} />, label: "Assignments" },
    { to: "/student/exams", icon: <FileQuestion size={20} />, label: "Exams" },
    { to: "/student/progress", icon: <ClipboardList size={20} />, label: "Progress Report" },
  ];
  
  const teacherLinks: LinkItem[] = [
    { 
      icon: <FileText size={20} />, 
      label: "Assignments", 
      to: "#",
      subMenu: [
        { label: "Create Assignment", to: "/teacher/assignments/create" },
        { label: "Manage Assignments", to: "/teacher/assignments" },
      ]
    },
    { 
      icon: <FileQuestion size={20} />, 
      label: "Exams", 
      to: "#",
      subMenu: [
        { label: "Create Exam", to: "/teacher/exams/create" },
        { label: "Manage Exams", to: "/teacher/exams" },
      ]
    },
    { to: "/teacher/students", icon: <Users size={20} />, label: "Students" },
  ];
  
  const adminLinks: LinkItem[] = [
    { to: "/admin/users", icon: <Users size={20} />, label: "User Management" },
    { to: "/admin/hr", icon: <Users size={20} />, label: "HR Module" },
    { to: "/admin/inventory", icon: <ShoppingBag size={20} />, label: "Inventory" },
    { to: "/admin/finance", icon: <Calculator size={20} />, label: "Accounts" },
  ];
  
  const userLinks = (() => {
    switch (userType) {
      case "student":
        return studentLinks;
      case "teacher":
        return teacherLinks;
      case "admin":
        return adminLinks;
      default:
        return [];
    }
  })();
  
  const links = [...commonLinks, ...userLinks];
  
  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}
      
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
      
      <aside
        className={cn(
          "bg-sidebar fixed top-0 left-0 h-full z-40 transition-all duration-300 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-sidebar-border flex justify-center items-center h-16">
            <h2 className="text-xl font-bold text-white">EduNexus Hub</h2>
          </div>
          
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {links.map((link, index) => (
                <SidebarLink
                  key={index}
                  to={link.to}
                  icon={link.icon}
                  label={link.label}
                  isActive={location.pathname === link.to}
                  onClick={closeSidebarIfMobile}
                  subMenu={link.subMenu}
                />
              ))}
            </nav>
          </div>
          
          <div className="p-4 border-t border-sidebar-border">
            <Link 
              to="/"
              className="flex items-center text-white hover:bg-sidebar-accent p-2 rounded-md transition-colors"
            >
              <LogOut className="mr-2" size={20} />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
