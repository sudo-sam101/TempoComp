import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OverviewCards from "@/components/dashboard/OverviewCards";
import RecentActivities from "@/components/dashboard/RecentActivities";
import ComplianceCalendar from "@/components/dashboard/ComplianceCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileText, Shield, TrendingUp, Users } from "lucide-react";

interface AdminDashboardProps {
  userName?: string;
  userAvatar?: string;
  notificationCount?: number;
  totalPolicies?: number;
  complianceRate?: number;
  pendingReports?: number;
  upcomingDeadlines?: number;
}

const AdminDashboard = ({
  userName = "Jane Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  notificationCount = 3,
  totalPolicies = 24,
  complianceRate = 87,
  pendingReports = 5,
  upcomingDeadlines = 8,
}: AdminDashboardProps) => {
  return (
    <DashboardLayout
      userRole="admin"
      userName={userName}
      userAvatar={userAvatar}
      notificationCount={notificationCount}
      pageTitle="Admin Dashboard"
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <OverviewCards
          totalPolicies={totalPolicies}
          complianceRate={complianceRate}
          pendingReports={pendingReports}
          upcomingDeadlines={upcomingDeadlines}
        />

        {/* Quick Actions */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Create Policy
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Set Compliance Deadline
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Add User
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Review Reports
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Recent Activities</TabsTrigger>
            <TabsTrigger value="calendar">Compliance Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivities maxItems={3} />
              <ComplianceCalendar />
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-4">
            <RecentActivities />
          </TabsContent>

          <TabsContent value="calendar" className="mt-4">
            <ComplianceCalendar />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
