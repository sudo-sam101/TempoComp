import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Upload, Lock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  incidentType: z.string({
    required_error: "Please select an incident type",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  date: z.string().optional(),
  location: z.string().optional(),
  involvedParties: z.string().optional(),
  evidence: z.any().optional(),
});

const WhistleblowingForm = ({ isOpen = true }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      description: "",
      date: "",
      location: "",
      involvedParties: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Generate a random tracking ID
      const generatedTrackingId = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingId(generatedTrackingId);
      setStep(3); // Move to confirmation step
      setIsSubmitting(false);

      toast({
        title: "Report submitted successfully",
        description: `Your tracking ID is ${generatedTrackingId}. Keep this ID to check the status of your report.`,
      });
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg bg-background border border-border shadow-lg">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Anonymous Whistleblowing</h1>
        <p className="text-muted-foreground">
          Submit a confidential report about policy violations or misconduct.
          Your identity will remain protected.
        </p>
      </div>

      {/* Security Notice */}
      <div className="mb-8 p-4 bg-secondary/20 rounded-md flex items-start gap-3">
        <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium mb-1">End-to-End Encryption</h3>
          <p className="text-sm text-muted-foreground">
            Your report is encrypted and anonymized. We do not track IP
            addresses or collect identifying information.
          </p>
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => setStep(2))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="incidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Type*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ethics">Ethics Violation</SelectItem>
                        <SelectItem value="harassment">
                          Harassment or Discrimination
                        </SelectItem>
                        <SelectItem value="safety">Safety Concern</SelectItem>
                        <SelectItem value="financial">
                          Financial Misconduct
                        </SelectItem>
                        <SelectItem value="data">
                          Data Privacy Breach
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the category that best describes the incident.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the incident or concern"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include relevant details but avoid including your own
                      identifying information.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Incident</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      When did this incident occur? (Approximate date is
                      acceptable)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Where did this incident occur?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="involvedParties"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Involved Parties</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List individuals or departments involved (titles/roles rather than names if possible)"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="evidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supporting Evidence</FormLabel>
                    <div className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:bg-secondary/10 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">
                        Drag files here or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload documents, screenshots, or other evidence (max
                        10MB)
                      </p>
                      <Input
                        type="file"
                        className="hidden"
                        id="evidence-upload"
                        multiple
                        onChange={(e) => {
                          // In a real implementation, you would handle file uploads here
                          field.onChange(e.target.files);
                        }}
                      />
                    </div>
                    <FormDescription>
                      All files are encrypted and metadata is stripped before
                      storage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="sm:flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="sm:flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      )}

      {step === 3 && trackingId && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center py-8"
        >
          <div className="mb-6 mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-primary" />
          </div>

          <h2 className="text-xl font-bold mb-2">
            Report Submitted Successfully
          </h2>
          <p className="text-muted-foreground mb-6">
            Your report has been encrypted and submitted anonymously.
          </p>

          <div className="bg-secondary/20 rounded-lg p-6 mb-6 mx-auto max-w-md">
            <p className="text-sm font-medium mb-2">Your Tracking ID</p>
            <p className="text-2xl font-mono font-bold tracking-wider">
              {trackingId}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Save this ID to check the status of your report later.
            </p>
          </div>

          <div className="flex items-start gap-3 text-left bg-yellow-500/10 p-4 rounded-md mb-6 mx-auto max-w-md">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Important</h3>
              <p className="text-xs text-muted-foreground">
                This ID is the only way to track your report. We cannot recover
                it if lost.
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              form.reset();
              setStep(1);
              setTrackingId(null);
            }}
          >
            Submit Another Report
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default WhistleblowingForm;
