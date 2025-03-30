import React, { useState } from "react";
import { Search, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ReportStatus {
  id: string;
  status: "pending" | "investigating" | "resolved";
  title: string;
  dateSubmitted: string;
  lastUpdated: string;
  description: string;
}

interface ReportTrackerProps {
  onTrackReport?: (trackingId: string) => void;
  defaultReports?: ReportStatus[];
}

const ReportTracker = ({
  onTrackReport = () => {},
  defaultReports = [
    {
      id: "WB-2023-001",
      status: "pending",
      title: "Potential Policy Violation",
      dateSubmitted: "2023-06-15",
      lastUpdated: "2023-06-15",
      description:
        "Your report has been received and is pending review by our compliance team.",
    },
    {
      id: "WB-2023-002",
      status: "investigating",
      title: "Workplace Safety Concern",
      dateSubmitted: "2023-05-20",
      lastUpdated: "2023-05-25",
      description:
        "Your report is currently under investigation. An investigator has been assigned to review the details provided.",
    },
    {
      id: "WB-2023-003",
      status: "resolved",
      title: "Ethical Misconduct Report",
      dateSubmitted: "2023-04-10",
      lastUpdated: "2023-05-05",
      description:
        "Your report has been fully investigated and appropriate actions have been taken. The case is now closed.",
    },
  ],
}: ReportTrackerProps) => {
  const [trackingId, setTrackingId] = useState("");
  const [report, setReport] = useState<ReportStatus | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackReport = () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call with timeout
    setTimeout(() => {
      const foundReport = defaultReports.find((r) => r.id === trackingId);

      if (foundReport) {
        setReport(foundReport);
        onTrackReport(trackingId);
      } else {
        setError("No report found with this tracking ID");
        setReport(null);
      }

      setIsLoading(false);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "investigating":
        return <Search className="h-5 w-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "investigating":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-background p-6 rounded-lg border border-border">
      <h2 className="text-2xl font-bold mb-6">Whistleblowing Report Tracker</h2>
      <p className="text-muted-foreground mb-6">
        Enter your tracking ID to check the status of your anonymous
        whistleblowing report.
      </p>

      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Enter tracking ID (e.g., WB-2023-001)"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleTrackReport} disabled={isLoading}>
          {isLoading ? "Tracking..." : "Track Report"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {report && (
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>Tracking ID: {report.id}</CardDescription>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${getStatusColor(report.status)}`}
              >
                {getStatusIcon(report.status)}
                <span className="capitalize">{report.status}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Date Submitted
                </h4>
                <p>{report.dateSubmitted}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </h4>
                <p>{report.lastUpdated}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Status Update
                </h4>
                <p>{report.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <p className="text-xs text-muted-foreground">
              This information is encrypted and only accessible with your
              tracking ID.
            </p>
          </CardFooter>
        </Card>
      )}

      {!report && !error && (
        <div className="text-center py-10 border border-dashed rounded-lg">
          <Search className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Report Found</h3>
          <p className="text-muted-foreground mt-1">
            Enter a tracking ID to view report status
          </p>
        </div>
      )}
    </div>
  );
};

export default ReportTracker;
