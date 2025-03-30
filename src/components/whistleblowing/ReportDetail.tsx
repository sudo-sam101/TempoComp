import React from "react";
import {
  Shield,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { format } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ReportDetailProps {
  reportId?: string;
  title?: string;
  description?: string;
  dateSubmitted?: Date;
  status?: "Pending" | "Investigating" | "Resolved";
  category?: string;
  evidence?: Array<{ name: string; type: string; url: string }>;
  investigationNotes?: string;
  assignedTo?: string;
  resolution?: string;
  trackingId?: string;
}

const ReportDetail = ({
  reportId = "WB-2023-0042",
  title = "Potential Data Privacy Violation",
  description = "I observed a team member downloading customer data to a personal device. This appears to violate our data protection policy section 3.2 regarding handling of sensitive information.",
  dateSubmitted = new Date(2023, 5, 15),
  status = "Investigating",
  category = "Data Privacy",
  evidence = [
    { name: "Screenshot.png", type: "image/png", url: "#" },
    { name: "Email_Thread.pdf", type: "application/pdf", url: "#" },
  ],
  investigationNotes = "Initial review confirms potential policy violation. Interviewing department members and reviewing access logs.",
  assignedTo = "Sarah Johnson",
  resolution = "",
  trackingId = "TRK-8F72-9D3E",
}: ReportDetailProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "Investigating":
        return (
          <Badge variant="default">
            <AlertTriangle className="mr-1 h-3 w-3" /> Investigating
          </Badge>
        );
      case "Resolved":
        return (
          <Badge variant="outline">
            <CheckCircle className="mr-1 h-3 w-3 text-green-500" /> Resolved
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-muted-foreground">
              Report ID: {reportId}
            </p>
            <p className="text-sm text-muted-foreground">
              Submitted: {format(dateSubmitted, "PPP")}
            </p>
            <div>{getStatusBadge(status)}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="secondary" size="sm">
            <Lock className="mr-2 h-4 w-4" /> Encryption Details
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="details">Report Details</TabsTrigger>
          <TabsTrigger value="investigation">Investigation</TabsTrigger>
          <TabsTrigger value="resolution">Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" /> Report Information
              </CardTitle>
              <CardDescription>
                Details of the whistleblowing report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm">{description}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Category</h3>
                <Badge variant="secondary">{category}</Badge>
              </div>

              <div>
                <h3 className="font-medium mb-2">Tracking ID</h3>
                <p className="text-sm font-mono bg-muted p-2 rounded inline-block">
                  {trackingId}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  This ID was provided to the reporter for anonymous status
                  tracking
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Evidence Attachments</h3>
                {evidence.length > 0 ? (
                  <ul className="space-y-2">
                    {evidence.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center bg-muted p-2 rounded"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        <span className="text-sm">{item.name}</span>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          View
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No evidence files attached
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigation" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" /> Investigation Details
              </CardTitle>
              <CardDescription>
                Manage the investigation process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Status</h3>
                <Select defaultValue={status}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Investigating">Investigating</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Assigned Investigator</h3>
                <Select defaultValue={assignedTo}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Assign investigator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                    <SelectItem value="Alex Rodriguez">
                      Alex Rodriguez
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Investigation Notes</h3>
                <Textarea
                  defaultValue={investigationNotes}
                  placeholder="Enter investigation notes here..."
                  className="min-h-[150px]"
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Activity Timeline</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-12 text-xs text-muted-foreground">
                      Today
                    </div>
                    <div className="flex-1 bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium">
                        Status updated to Investigating
                      </p>
                      <p className="text-xs text-muted-foreground">By: Admin</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 text-xs text-muted-foreground">
                      Yesterday
                    </div>
                    <div className="flex-1 bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium">
                        Assigned to Sarah Johnson
                      </p>
                      <p className="text-xs text-muted-foreground">By: Admin</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-12 text-xs text-muted-foreground">
                      {format(dateSubmitted, "MMM d")}
                    </div>
                    <div className="flex-1 bg-muted p-3 rounded-md">
                      <p className="text-sm font-medium">Report submitted</p>
                      <p className="text-xs text-muted-foreground">Anonymous</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">Save Changes</Button>
              <Button variant="outline">Request Additional Information</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resolution" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Resolution
              </CardTitle>
              <CardDescription>
                Document the resolution of this report
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Resolution Status</h3>
                <Select
                  defaultValue={
                    status === "Resolved" ? "resolved" : "unresolved"
                  }
                >
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select resolution status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unresolved">Unresolved</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Resolution Type</h3>
                <Select defaultValue="">
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select resolution type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="policy_violation">
                      Policy Violation Confirmed
                    </SelectItem>
                    <SelectItem value="no_violation">
                      No Violation Found
                    </SelectItem>
                    <SelectItem value="insufficient_evidence">
                      Insufficient Evidence
                    </SelectItem>
                    <SelectItem value="remediation">
                      Remediation Implemented
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-medium mb-2">Resolution Details</h3>
                <Textarea
                  defaultValue={resolution}
                  placeholder="Describe the resolution in detail..."
                  className="min-h-[150px]"
                />
              </div>

              <div>
                <h3 className="font-medium mb-2">Actions Taken</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="action1" className="mr-2" />
                    <label htmlFor="action1" className="text-sm">
                      Policy updated
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="action2" className="mr-2" />
                    <label htmlFor="action2" className="text-sm">
                      Disciplinary action
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="action3" className="mr-2" />
                    <label htmlFor="action3" className="text-sm">
                      Additional training provided
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="action4" className="mr-2" />
                    <label htmlFor="action4" className="text-sm">
                      Process improvement implemented
                    </label>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium mb-2">Notify Reporter</h3>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm mb-3">
                    Send an anonymous update to the whistleblower
                  </p>
                  <Textarea
                    placeholder="Enter message to reporter..."
                    className="min-h-[100px] mb-3"
                  />
                  <Button variant="secondary" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" /> Send Anonymous
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">Finalize Resolution</Button>
              <Button variant="outline">Save Draft</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportDetail;
