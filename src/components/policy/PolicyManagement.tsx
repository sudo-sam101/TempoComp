import React, { useState } from "react";
import { PlusCircle, Search, Filter, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PolicyForm from "./PolicyForm";
import PolicyTable from "./PolicyTable";

interface Policy {
  id: string;
  title: string;
  category: string;
  effectiveDate: Date;
  status: "active" | "archived" | "draft";
  assignedTo: string[];
  riskLevel: "low" | "medium" | "high";
}

interface PolicyManagementProps {
  policies?: Policy[];
}

const PolicyManagement = ({ policies = [] }: PolicyManagementProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);

  const handleCreatePolicy = () => {
    setShowCreateForm(true);
    setEditingPolicy(null);
  };

  const handleEditPolicy = (policy: Policy) => {
    setEditingPolicy(policy);
    setShowCreateForm(true);
  };

  const handleFormSubmit = (formData: any) => {
    // Handle form submission (create or update policy)
    console.log("Form submitted:", formData);
    setShowCreateForm(false);
    setEditingPolicy(null);
  };

  const handleArchivePolicy = (policy: Policy) => {
    // Handle policy archiving
    console.log("Archive policy:", policy);
  };

  const handleAssignPolicy = (policy: Policy, users: string[]) => {
    // Handle policy assignment
    console.log("Assign policy:", policy, "to users:", users);
  };

  return (
    <div className="w-full h-full bg-background p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Policy Management</h1>
        <Button onClick={handleCreatePolicy}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Policy
        </Button>
      </div>

      {showCreateForm ? (
        <Card>
          <CardContent className="p-6">
            <PolicyForm
              onSubmit={handleFormSubmit}
              initialData={
                editingPolicy
                  ? {
                      title: editingPolicy.title,
                      description: "", // Assuming description would be part of the policy
                      category: editingPolicy.category,
                      effectiveDate: editingPolicy.effectiveDate,
                      document: null,
                    }
                  : undefined
              }
              isEditing={!!editingPolicy}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search policies..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Advanced
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Policies</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <PolicyTable
                onEdit={handleEditPolicy}
                onArchive={handleArchivePolicy}
                onAssign={handleAssignPolicy}
              />
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <PolicyTable
                policies={policies.filter((p) => p.status === "active")}
                onEdit={handleEditPolicy}
                onArchive={handleArchivePolicy}
                onAssign={handleAssignPolicy}
              />
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <PolicyTable
                policies={policies.filter((p) => p.status === "draft")}
                onEdit={handleEditPolicy}
                onArchive={handleArchivePolicy}
                onAssign={handleAssignPolicy}
              />
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <PolicyTable
                policies={policies.filter((p) => p.status === "archived")}
                onEdit={handleEditPolicy}
                onArchive={handleArchivePolicy}
                onAssign={handleAssignPolicy}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PolicyManagement;
