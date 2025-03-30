import React, { useState } from "react";
import {
  MoreHorizontal,
  Edit,
  Archive,
  UserPlus,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface Policy {
  id: string;
  title: string;
  category: string;
  effectiveDate: Date;
  status: "active" | "archived" | "draft";
  assignedTo: string[];
  riskLevel: "low" | "medium" | "high";
}

interface PolicyTableProps {
  policies?: Policy[];
  onEdit?: (policy: Policy) => void;
  onArchive?: (policy: Policy) => void;
  onAssign?: (policy: Policy, users: string[]) => void;
}

const PolicyTable = ({
  policies = defaultPolicies,
  onEdit = () => {},
  onArchive = () => {},
  onAssign = () => {},
}: PolicyTableProps) => {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users for assignment dialog
  const availableUsers = [
    { id: "user1", name: "John Doe", department: "HR" },
    { id: "user2", name: "Jane Smith", department: "Legal" },
    { id: "user3", name: "Robert Johnson", department: "IT" },
    { id: "user4", name: "Emily Davis", department: "Finance" },
    { id: "user5", name: "Michael Wilson", department: "Operations" },
  ];

  const handleAssignUsers = () => {
    if (selectedPolicy) {
      onAssign(selectedPolicy, selectedUsers);
      setAssignDialogOpen(false);
      setSelectedUsers([]);
    }
  };

  const getRiskBadge = (risk: Policy["riskLevel"]) => {
    switch (risk) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>;
      case "low":
        return <Badge variant="outline">Low Risk</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Policy["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>;
      case "archived":
        return (
          <Badge variant="outline" className="text-gray-400">
            Archived
          </Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-background rounded-md border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Policy Management</h2>
        <Button>
          <span className="mr-2">Add New Policy</span>
          <span className="sr-only">Add new policy</span>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of all company policies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Effective Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">{policy.title}</TableCell>
                <TableCell>{policy.category}</TableCell>
                <TableCell>
                  {format(policy.effectiveDate, "MMM dd, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(policy.status)}</TableCell>
                <TableCell>{getRiskBadge(policy.riskLevel)}</TableCell>
                <TableCell>{policy.assignedTo.length} users</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(policy)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedPolicy(policy);
                          setAssignDialogOpen(true);
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onArchive(policy)}
                      >
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Assign Users Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Policy to Users</DialogTitle>
            <DialogDescription>
              Select users or departments to assign this policy to.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-muted"
                >
                  <Checkbox
                    id={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter((id) => id !== user.id),
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={user.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                  >
                    <span>{user.name}</span>
                    <span className="text-muted-foreground">
                      {user.department}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <div className="flex items-center">
              {selectedUsers.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedUsers.length} user
                  {selectedUsers.length !== 1 ? "s" : ""} selected
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setAssignDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAssignUsers}>Assign</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Default policies for demonstration
const defaultPolicies: Policy[] = [
  {
    id: "1",
    title: "Data Privacy Policy",
    category: "Information Security",
    effectiveDate: new Date("2023-01-15"),
    status: "active",
    assignedTo: ["user1", "user3"],
    riskLevel: "high",
  },
  {
    id: "2",
    title: "Code of Conduct",
    category: "HR",
    effectiveDate: new Date("2023-03-10"),
    status: "active",
    assignedTo: ["user1", "user2", "user4", "user5"],
    riskLevel: "medium",
  },
  {
    id: "3",
    title: "Remote Work Policy",
    category: "HR",
    effectiveDate: new Date("2023-05-22"),
    status: "active",
    assignedTo: ["user1", "user2", "user3", "user4", "user5"],
    riskLevel: "low",
  },
  {
    id: "4",
    title: "Information Classification Policy",
    category: "Information Security",
    effectiveDate: new Date("2023-02-28"),
    status: "archived",
    assignedTo: ["user3"],
    riskLevel: "high",
  },
  {
    id: "5",
    title: "Acceptable Use Policy",
    category: "IT",
    effectiveDate: new Date("2023-06-15"),
    status: "draft",
    assignedTo: [],
    riskLevel: "medium",
  },
];

export default PolicyTable;
