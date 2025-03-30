import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, FileText, AlertCircle, CheckCircle, User } from "lucide-react";

type ActivityType =
  | "policy_update"
  | "compliance_submission"
  | "whistleblowing_report";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  status?: "pending" | "investigating" | "resolved";
}

interface RecentActivitiesProps {
  activities?: Activity[];
  maxItems?: number;
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case "policy_update":
      return <FileText className="h-4 w-4 text-blue-500" />;
    case "compliance_submission":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "whistleblowing_report":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusBadge = (status?: string) => {
  if (!status) return null;

  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    },
    investigating: {
      label: "Investigating",
      className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    },
    resolved: {
      label: "Resolved",
      className: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge variant="outline" className={cn(config.className)}>
      {config.label}
    </Badge>
  );
};

const ActivityItem = ({ activity }: { activity: Activity }) => {
  return (
    <div className="flex items-start space-x-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{activity.title}</p>
          {getStatusBadge(activity.status)}
        </div>
        <p className="text-sm text-slate-400">{activity.description}</p>
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="mr-1 h-3 w-3" />
          <span>{activity.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

const RecentActivities = ({
  activities = [
    {
      id: "1",
      type: "policy_update",
      title: "Data Privacy Policy Updated",
      description:
        "The data privacy policy has been updated with new GDPR compliance requirements.",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "compliance_submission",
      title: "Annual Security Audit Submitted",
      description:
        "The annual security audit documentation has been submitted for review.",
      timestamp: "Yesterday",
    },
    {
      id: "3",
      type: "whistleblowing_report",
      title: "New Anonymous Report",
      description:
        "A new whistleblowing report has been submitted regarding workplace safety.",
      timestamp: "2 days ago",
      status: "investigating",
    },
    {
      id: "4",
      type: "whistleblowing_report",
      title: "Whistleblowing Case Resolved",
      description:
        "The investigation into the harassment report has been completed.",
      timestamp: "1 week ago",
      status: "resolved",
    },
    {
      id: "5",
      type: "policy_update",
      title: "Workplace Safety Guidelines Updated",
      description:
        "The workplace safety guidelines have been updated with new requirements.",
      timestamp: "2 weeks ago",
    },
  ],
  maxItems = 5,
}: RecentActivitiesProps) => {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {displayedActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ActivityItem activity={activity} />
              {index < displayedActivities.length - 1 && (
                <Separator className="bg-slate-800" />
              )}
            </React.Fragment>
          ))}
          {displayedActivities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <User className="h-10 w-10 text-slate-500 mb-2" />
              <p className="text-sm text-slate-500">No recent activities</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
