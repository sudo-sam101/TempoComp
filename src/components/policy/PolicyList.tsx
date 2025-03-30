import React, { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Policy {
  id: string;
  title: string;
  category: string;
  effectiveDate: string;
  status: "active" | "pending" | "expired";
  description: string;
  lastUpdated: string;
  acknowledgementRequired: boolean;
  acknowledged?: boolean;
}

interface PolicyListProps {
  policies?: Policy[];
  onViewPolicy?: (policyId: string) => void;
  onAcknowledgePolicy?: (policyId: string) => void;
}

const PolicyList = ({
  policies = [
    {
      id: "1",
      title: "Data Privacy Policy",
      category: "Information Security",
      effectiveDate: "2023-05-15",
      status: "active",
      description:
        "Guidelines for handling customer data in compliance with GDPR and other privacy regulations.",
      lastUpdated: "2023-04-01",
      acknowledgementRequired: true,
      acknowledged: true,
    },
    {
      id: "2",
      title: "Anti-Harassment Policy",
      category: "HR",
      effectiveDate: "2023-03-10",
      status: "active",
      description:
        "Guidelines to prevent and address workplace harassment and discrimination.",
      lastUpdated: "2023-02-15",
      acknowledgementRequired: true,
      acknowledged: false,
    },
    {
      id: "3",
      title: "Information Security Policy",
      category: "Information Security",
      effectiveDate: "2023-06-01",
      status: "pending",
      description:
        "Guidelines for securing company information assets and preventing data breaches.",
      lastUpdated: "2023-05-20",
      acknowledgementRequired: true,
    },
    {
      id: "4",
      title: "Code of Conduct",
      category: "Ethics",
      effectiveDate: "2022-12-01",
      status: "active",
      description:
        "Standards of ethical business conduct expected from all employees.",
      lastUpdated: "2022-11-15",
      acknowledgementRequired: true,
      acknowledged: true,
    },
    {
      id: "5",
      title: "Remote Work Policy",
      category: "HR",
      effectiveDate: "2023-01-15",
      status: "active",
      description:
        "Guidelines for working remotely, including security and productivity expectations.",
      lastUpdated: "2022-12-20",
      acknowledgementRequired: true,
      acknowledged: true,
    },
  ],
  onViewPolicy = () => {},
  onAcknowledgePolicy = () => {},
}: PolicyListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Get unique categories for filter dropdown
  const categories = [
    "all",
    ...new Set(policies.map((policy) => policy.category)),
  ];

  // Filter policies based on search term and filters
  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || policy.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || policy.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Sort policies
  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    let comparison = 0;

    if (sortField === "title") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortField === "category") {
      comparison = a.category.localeCompare(b.category);
    } else if (sortField === "effectiveDate") {
      comparison =
        new Date(a.effectiveDate).getTime() -
        new Date(b.effectiveDate).getTime();
    } else if (sortField === "lastUpdated") {
      comparison =
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getStatusBadge = (status: string, acknowledged?: boolean) => {
    if (status === "active") {
      if (acknowledged === false) {
        return (
          <Badge variant="destructive" className="ml-2">
            Action Required
          </Badge>
        );
      }
      return (
        <Badge variant="default" className="ml-2">
          Active
        </Badge>
      );
    } else if (status === "pending") {
      return (
        <Badge variant="secondary" className="ml-2">
          Pending
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="ml-2">
          Expired
        </Badge>
      );
    }
  };

  const getStatusIcon = (status: string, acknowledged?: boolean) => {
    if (status === "active") {
      if (acknowledged === false) {
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      }
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (status === "pending") {
      return <Clock className="h-5 w-5 text-yellow-500" />;
    } else {
      return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? (
        <ChevronUp className="h-4 w-4 ml-1" />
      ) : (
        <ChevronDown className="h-4 w-4 ml-1" />
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-background text-foreground">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedPolicies.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Filter className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No policies found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm font-medium text-muted-foreground px-4">
            <div className="flex-1 max-w-[40%]">
              <button
                onClick={() => handleSort("title")}
                className="flex items-center hover:text-foreground"
              >
                Policy Title {getSortIcon("title")}
              </button>
            </div>
            <div className="flex-1 max-w-[20%] hidden md:block">
              <button
                onClick={() => handleSort("category")}
                className="flex items-center hover:text-foreground"
              >
                Category {getSortIcon("category")}
              </button>
            </div>
            <div className="flex-1 max-w-[20%] hidden md:block">
              <button
                onClick={() => handleSort("effectiveDate")}
                className="flex items-center hover:text-foreground"
              >
                Effective Date {getSortIcon("effectiveDate")}
              </button>
            </div>
            <div className="flex-1 max-w-[20%] text-right">
              <span>Status</span>
            </div>
          </div>

          {sortedPolicies.map((policy) => (
            <Card
              key={policy.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                  <div className="flex-1 max-w-[40%]">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(policy.status, policy.acknowledged)}
                      <div>
                        <h3 className="font-medium text-foreground">
                          {policy.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 md:hidden mt-1">
                          {policy.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 max-w-[20%] hidden md:block">
                    <span className="text-sm">{policy.category}</span>
                  </div>
                  <div className="flex-1 max-w-[20%] hidden md:block">
                    <span className="text-sm">
                      {new Date(policy.effectiveDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex-1 max-w-[20%] flex items-center justify-end gap-2">
                    {getStatusBadge(policy.status, policy.acknowledged)}
                  </div>
                </div>
                <div className="border-t border-border px-4 py-3 flex flex-col sm:flex-row justify-between gap-3">
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Last updated:{" "}
                    {new Date(policy.lastUpdated).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewPolicy(policy.id)}
                    >
                      View Details
                    </Button>
                    {policy.acknowledgementRequired && !policy.acknowledged && (
                      <Button
                        size="sm"
                        onClick={() => onAcknowledgePolicy(policy.id)}
                      >
                        Acknowledge
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PolicyList;
