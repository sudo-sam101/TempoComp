import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  FileText,
  Users,
  AlertTriangle,
  FileBarChart,
  LogOut,
  Shield,
  Home,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
}

const SidebarItem = ({
  icon,
  label,
  path,
  isActive = false,
}: SidebarItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
            )}
          >
            <div className="text-xl">{icon}</div>
            <span className="font-medium">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarProps {
  userRole?: "admin" | "employee";
}

const Sidebar = ({ userRole = "admin" }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Admin navigation items
  const adminNavItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/admin" },
    {
      icon: <FileText size={20} />,
      label: "Policy Management",
      path: "/admin/policies",
    },
    {
      icon: <Shield size={20} />,
      label: "Compliance Tracking",
      path: "/admin/compliance",
    },
    {
      icon: <Users size={20} />,
      label: "User Management",
      path: "/admin/users",
    },
    {
      icon: <AlertTriangle size={20} />,
      label: "Whistleblowing",
      path: "/admin/whistleblowing",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Reports & Analytics",
      path: "/admin/reports",
    },
  ];

  // Employee navigation items
  const employeeNavItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/employee" },
    {
      icon: <FileText size={20} />,
      label: "Policies",
      path: "/employee/policies",
    },
    {
      icon: <Shield size={20} />,
      label: "Compliance Tasks",
      path: "/employee/tasks",
    },
    {
      icon: <AlertTriangle size={20} />,
      label: "Whistleblowing",
      path: "/employee/whistleblowing",
    },
    {
      icon: <FileBarChart size={20} />,
      label: "My Reports",
      path: "/employee/reports",
    },
  ];

  const navItems = userRole === "admin" ? adminNavItems : employeeNavItems;

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">ComplianceGuard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Regulatory Compliance Platform
        </p>
      </div>

      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={currentPath === item.path}
            />
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <SidebarItem
          icon={<LogOut size={20} />}
          label="Logout"
          path="/logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;
