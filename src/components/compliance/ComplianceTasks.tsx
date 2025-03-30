import React, { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  FileTextIcon,
  UploadIcon,
  CheckCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";

interface ComplianceTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "pending" | "in-progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  category: string;
  progress: number;
  documents?: {
    name: string;
    required: boolean;
    uploaded: boolean;
  }[];
}

interface ComplianceTasksProps {
  tasks?: ComplianceTask[];
  onTaskUpdate?: (taskId: string, updates: Partial<ComplianceTask>) => void;
  onTaskSubmit?: (taskId: string) => void;
}

const ComplianceTasks = ({
  tasks = [
    {
      id: "1",
      title: "Annual Data Privacy Certification",
      description:
        "Complete the annual data privacy certification process including documentation review and quiz.",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      status: "in-progress",
      priority: "high",
      category: "Data Privacy",
      progress: 60,
      documents: [
        {
          name: "Privacy Policy Acknowledgment",
          required: true,
          uploaded: true,
        },
        {
          name: "Data Handling Certification",
          required: true,
          uploaded: false,
        },
        { name: "GDPR Compliance Form", required: true, uploaded: false },
      ],
    },
    {
      id: "2",
      title: "Quarterly Security Training",
      description:
        "Complete the mandatory security awareness training for Q2 2023.",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      status: "pending",
      priority: "medium",
      category: "Security",
      progress: 0,
      documents: [
        {
          name: "Training Completion Certificate",
          required: true,
          uploaded: false,
        },
      ],
    },
    {
      id: "3",
      title: "Code of Conduct Review",
      description:
        "Annual review and acknowledgment of the company code of conduct.",
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (overdue)
      status: "overdue",
      priority: "high",
      category: "Ethics",
      progress: 30,
      documents: [
        {
          name: "Code of Conduct Acknowledgment",
          required: true,
          uploaded: false,
        },
        { name: "Ethics Quiz Results", required: false, uploaded: false },
      ],
    },
  ],
  onTaskUpdate = () => {},
  onTaskSubmit = () => {},
}: ComplianceTasksProps) => {
  const [selectedTask, setSelectedTask] = useState<ComplianceTask | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default";
      case "in-progress":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleTaskClick = (task: ComplianceTask) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleDocumentToggle = (
    taskId: string,
    docName: string,
    uploaded: boolean,
  ) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.documents) {
      const updatedDocuments = task.documents.map((doc) =>
        doc.name === docName ? { ...doc, uploaded } : doc,
      );

      // Calculate new progress based on uploaded documents
      const requiredDocs = task.documents.filter((doc) => doc.required).length;
      const uploadedRequiredDocs = updatedDocuments.filter(
        (doc) => doc.required && doc.uploaded,
      ).length;
      const newProgress =
        requiredDocs > 0
          ? Math.round((uploadedRequiredDocs / requiredDocs) * 100)
          : 100;

      onTaskUpdate(taskId, {
        documents: updatedDocuments,
        progress: newProgress,
        status: newProgress === 100 ? "completed" : task.status,
      });
    }
  };

  const handleSubmitTask = (taskId: string) => {
    onTaskSubmit(taskId);
    setDialogOpen(false);
  };

  return (
    <div className="w-full bg-background text-foreground">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Compliance Tasks</h2>
        <p className="text-muted-foreground">
          Manage your pending compliance requirements and deadlines
        </p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className="hover:bg-accent/5 cursor-pointer transition-colors"
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{task.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {task.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  <Badge variant={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Due: {format(task.dueDate, "MMM dd, yyyy")}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>Category: {task.category}</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleTaskClick(task)}
                variant="outline"
                className="w-full"
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedTask && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTask.title}</DialogTitle>
                <DialogDescription>
                  Due: {format(selectedTask.dueDate, "MMMM dd, yyyy")}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTask.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">
                    Required Documents
                  </h4>
                  {selectedTask.documents &&
                  selectedTask.documents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTask.documents.map((doc) => (
                        <div
                          key={doc.name}
                          className="flex items-start space-x-3"
                        >
                          <Checkbox
                            id={`doc-${doc.name}`}
                            checked={doc.uploaded}
                            onCheckedChange={(checked) =>
                              handleDocumentToggle(
                                selectedTask.id,
                                doc.name,
                                checked === true,
                              )
                            }
                          />
                          <div className="grid gap-1.5">
                            <label
                              htmlFor={`doc-${doc.name}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {doc.name}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {doc.required ? "Required" : "Optional"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No documents required for this task.
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Completion Progress
                    </span>
                    <span className="text-sm font-medium">
                      {selectedTask.progress}%
                    </span>
                  </div>
                  <Progress value={selectedTask.progress} className="h-2" />
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  {selectedTask.status === "overdue" ? (
                    <div className="flex items-center text-destructive">
                      <AlertCircleIcon className="h-4 w-4 mr-1" />
                      <span>This task is overdue</span>
                    </div>
                  ) : selectedTask.status === "completed" ? (
                    <div className="flex items-center text-green-500">
                      <CheckCircleIcon className="h-4 w-4 mr-1" />
                      <span>This task is completed</span>
                    </div>
                  ) : null}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleSubmitTask(selectedTask.id)}
                  disabled={selectedTask.progress < 100}
                >
                  {selectedTask.progress < 100 ? (
                    <>
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload Documents
                    </>
                  ) : (
                    <>
                      <FileTextIcon className="mr-2 h-4 w-4" />
                      Submit Task
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplianceTasks;
