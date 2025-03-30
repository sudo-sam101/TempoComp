import React, { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Plus,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ReportDetail from "./ReportDetail";

interface Report {
  id: string;
  title: string;
  category: string;
  dateSubmitted: Date;
  status: "Pending" | "Investigating" | "Resolved";
  priority: "Low" | "Medium" | "High";
  assignedTo?: string;
  trackingId: string;
}

interface ReportManagementProps {
  reports?: Report[];
}

const ReportManagement = ({
  reports: initialReports,
}: ReportManagementProps) => {
  const defaultReports: Report[] = [
    {
      id: "WB-2023-0042",
      title: "Potential Data Privacy Violation",
      category: "Data Privacy",
      dateSubmitted: new Date(2023, 5, 15),
      status: "Investigating",
      priority: "High",
      assignedTo: "Sarah Johnson",
      trackingId: "TRK-8F72-9D3E",
    },
    {
      id: "WB-2023-0041",
      title: "Harassment Complaint",
      category: "Workplace Conduct",
      dateSubmitted: new Date(2023, 5, 10),
      status: "Pending",
      priority: "Medium",
      trackingId: "TRK-7E61-8C2D",
    },
    {
      id: "WB-2023-0040",
      title: "Financial Irregularity",
      category: "Financial",
      dateSubmitted: new Date(2023, 5, 5),
      status: "Resolved",
      priority: "High",
      assignedTo: "Michael Chen",
      trackingId: "TRK-6D50-7B1C",
    },
    {
      id: "WB-2023-0039",
      title: "Safety Protocol Violation",
      category: "Health & Safety",
      dateSubmitted: new Date(2023, 4, 28),
      status: "Investigating",
      priority: "Medium",
      assignedTo: "Alex Rodriguez",
      trackingId: "TRK-5C49-6A0B",
    },
    {
      id: "WB-2023-0038",
      title: "Conflict of Interest",
      category: "Ethics",
      dateSubmitted: new Date(2023, 4, 20),
      status: "Resolved",
      priority: "Low",
      assignedTo: "Sarah Johnson",
      trackingId: "TRK-4B38-5Z9A",
    },
  ];

  const [reports] = useState<Report[]>(initialReports || defaultReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.trackingId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      report.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

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

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  return (
    <div className="bg-background p-6 rounded-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Whistleblowing Reports</h1>
          <p className="text-muted-foreground">
            Manage and investigate anonymous reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Reports
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Manual Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
              All Reports
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="investigating"
              onClick={() => setStatusFilter("investigating")}
            >
              Investigating
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              onClick={() => setStatusFilter("resolved")}
            >
              Resolved
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority (High-Low)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>
                        {report.dateSubmitted.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.priority === "High"
                              ? "destructive"
                              : report.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="font-normal"
                        >
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.assignedTo || "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No reports found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-0">
          {/* Content for pending tab - uses the same filtered data */}
          <div className="rounded-md border">
            <Table>
              {/* Same table structure as 'all' tab */}
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>
                        {report.dateSubmitted.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.priority === "High"
                              ? "destructive"
                              : report.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="font-normal"
                        >
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.assignedTo || "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No pending reports found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="investigating" className="mt-0">
          {/* Content for investigating tab - uses the same filtered data */}
          <div className="rounded-md border">
            <Table>
              {/* Same table structure as other tabs */}
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>
                        {report.dateSubmitted.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.priority === "High"
                              ? "destructive"
                              : report.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="font-normal"
                        >
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.assignedTo || "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No reports under investigation
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="resolved" className="mt-0">
          {/* Content for resolved tab - uses the same filtered data */}
          <div className="rounded-md border">
            <Table>
              {/* Same table structure as other tabs */}
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>
                        {report.dateSubmitted.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            report.priority === "High"
                              ? "destructive"
                              : report.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                          className="font-normal"
                        >
                          {report.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.assignedTo || "—"}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No resolved reports found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Report Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <ReportDetail
              reportId={selectedReport.id}
              title={selectedReport.title}
              dateSubmitted={selectedReport.dateSubmitted}
              status={selectedReport.status}
              category={selectedReport.category}
              trackingId={selectedReport.trackingId}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportManagement;
