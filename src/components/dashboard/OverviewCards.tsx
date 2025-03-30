import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AlertCircle, Calendar, FileText, TrendingUp } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const OverviewCard = ({
  title = "Card Title",
  value = "0",
  description,
  icon,
  trend = "neutral",
  trendValue,
  className,
}: OverviewCardProps) => {
  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500",
  };

  return (
    <Card className={cn("bg-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-secondary/20 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {trendValue && (
          <div
            className={`mt-2 flex items-center text-xs ${trendColor[trend]}`}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === "down" && (
              <TrendingUp className="mr-1 h-3 w-3 rotate-180" />
            )}
            {trendValue}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface OverviewCardsProps {
  totalPolicies?: number;
  complianceRate?: number;
  pendingReports?: number;
  upcomingDeadlines?: number;
  className?: string;
}

const OverviewCards = ({
  totalPolicies = 24,
  complianceRate = 87,
  pendingReports = 5,
  upcomingDeadlines = 8,
  className,
}: OverviewCardsProps) => {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      <OverviewCard
        title="Total Policies"
        value={totalPolicies.toString()}
        description="Active company policies"
        icon={<FileText className="h-4 w-4" />}
        trend="up"
        trendValue="+3 this month"
      />
      <OverviewCard
        title="Compliance Rate"
        value={`${complianceRate}%`}
        description="Overall compliance status"
        icon={<TrendingUp className="h-4 w-4" />}
        trend={complianceRate >= 85 ? "up" : "down"}
        trendValue={
          complianceRate >= 85 ? "+2% from last month" : "-3% from last month"
        }
      />
      <OverviewCard
        title="Pending Reports"
        value={pendingReports.toString()}
        description="Whistleblowing reports to review"
        icon={<AlertCircle className="h-4 w-4" />}
        trend={pendingReports > 0 ? "up" : "neutral"}
        trendValue={
          pendingReports > 0
            ? `${pendingReports} need attention`
            : "No new reports"
        }
      />
      <OverviewCard
        title="Upcoming Deadlines"
        value={upcomingDeadlines.toString()}
        description="Due in the next 30 days"
        icon={<Calendar className="h-4 w-4" />}
        trend={upcomingDeadlines > 5 ? "up" : "neutral"}
        trendValue={`Next deadline in ${Math.floor(Math.random() * 7) + 1} days`}
      />
    </div>
  );
};

export default OverviewCards;
