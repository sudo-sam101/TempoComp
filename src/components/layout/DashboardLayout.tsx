import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import Header from "@/components/navigation/Header";

interface DashboardLayoutProps {
  userRole?: "admin" | "employee";
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  pageTitle?: string;
  children?: React.ReactNode;
}

const DashboardLayout = ({
  userRole = "admin",
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  notificationCount = 3,
  pageTitle = "Dashboard",
  children,
}: DashboardLayoutProps) => {
  // Handle logout functionality
  const handleLogout = () => {
    console.log("Logging out...");
    // Add actual logout logic here
  };

  // Handle profile click
  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Navigate to profile page or open profile modal
  };

  // Handle settings click
  const handleSettingsClick = () => {
    console.log("Settings clicked");
    // Navigate to settings page or open settings modal
  };

  return (
    <div className="flex h-screen w-full bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar userRole={userRole} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          title={pageTitle}
          notificationCount={notificationCount}
          userName={userName}
          userAvatar={userAvatar}
          userRole={userRole === "admin" ? "Admin" : "Employee"}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ComplianceGuard. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
