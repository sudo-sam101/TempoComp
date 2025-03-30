import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PolicyList from "@/components/policy/PolicyList";
import ComplianceTasks from "@/components/compliance/ComplianceTasks";
import ReportTracker from "@/components/whistleblowing/ReportTracker";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface EmployeeDashboardProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  pendingTasks?: number;
  pendingPolicies?: number;
}

const EmployeeDashboard = ({
  userName = "Alex Johnson",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  notificationCount = 5,
  pendingTasks = 3,
  pendingPolicies = 2,
}: EmployeeDashboardProps) => {
  // Handle view policy details
  const handleViewPolicy = (policyId: string) => {
    console.log(`Viewing policy details for ID: ${policyId}`);
    // Navigate to policy details page or open modal
  };

  // Handle policy acknowledgment
  const handleAcknowledgePolicy = (policyId: string) => {
    console.log(`Acknowledging policy with ID: ${policyId}`);
    // Update policy acknowledgment status
  };

  // Handle task updates
  const handleTaskUpdate = (taskId: string, updates: any) => {
    console.log(`Updating task ${taskId} with:`, updates);
    // Update task in state or backend
  };

  // Handle task submission
  const handleTaskSubmit = (taskId: string) => {
    console.log(`Submitting task with ID: ${taskId}`);
    // Submit completed task to backend
  };

  // Handle report tracking
  const handleTrackReport = (trackingId: string) => {
    console.log(`Tracking report with ID: ${trackingId}`);
    // Fetch report status from backend
  };

  // Handle new whistleblowing report
  const handleNewReport = () => {
    console.log("Creating new whistleblowing report");
    // Navigate to whistleblowing form
  };

  return (
    <DashboardLayout
      userRole="employee"
      userName={userName}
      userAvatar={userAvatar}
      notificationCount={notificationCount}
      pageTitle="Employee Dashboard"
    >
      <div className="space-y-8 bg-background text-foreground">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Tasks</CardTitle>
              <CardDescription>
                Compliance tasks requiring action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{pendingTasks}</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" /> View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Policies</CardTitle>
              <CardDescription>
                Policies requiring acknowledgment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{pendingPolicies}</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="h-4 w-4" /> View All
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <CardDescription>Recent alerts and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{notificationCount}</span>
                <Button variant="outline" size="sm" className="gap-1">
                  <Bell className="h-4 w-4" /> View All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Assigned Policies</h2>
            <Button variant="outline" size="sm">
              View All Policies
            </Button>
          </div>
          <PolicyList
            onViewPolicy={handleViewPolicy}
            onAcknowledgePolicy={handleAcknowledgePolicy}
          />
        </div>

        {/* Two Column Layout for Tasks and Whistleblowing */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Compliance Tasks */}
          <div className="space-y-4">
            <ComplianceTasks
              onTaskUpdate={handleTaskUpdate}
              onTaskSubmit={handleTaskSubmit}
            />
          </div>

          {/* Whistleblowing Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Whistleblowing</h2>
              <Button onClick={handleNewReport} className="gap-1">
                <PlusCircle className="h-4 w-4" /> New Report
              </Button>
            </div>
            <ReportTracker onTrackReport={handleTrackReport} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;
