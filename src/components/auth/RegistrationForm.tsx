import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, User, UserPlus } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/use-toast";

const registrationSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    fullName: z.string().min(2, { message: "Full name is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onRegistration?: (
    values: RegistrationFormValues,
    userType: "admin" | "employee",
  ) => void;
}

const RegistrationForm = ({
  onRegistration = () => {},
}: RegistrationFormProps) => {
  const [userType, setUserType] = useState<"admin" | "employee">("employee");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    try {
      // Register the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: userType,
          },
        },
      });

      if (error) throw error;

      // If successful, create a profile in the profiles table
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            full_name: values.fullName,
            email: values.email,
            role: userType,
          },
        ]);

        if (profileError) throw profileError;
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });

      onRegistration(values, userType);
      reset();
      navigate("/login");
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card border-border shadow-lg">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Sign up to access the compliance platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="employee"
          className="w-full"
          onValueChange={(value) => setUserType(value as "admin" | "employee")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="employee" className="flex items-center gap-2">
              <User size={16} />
              <span>Employee</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield size={16} />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employee" className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employee-fullName">Full Name</Label>
                <Input
                  id="employee-fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee-email">Email</Label>
                <Input
                  id="employee-email"
                  type="email"
                  placeholder="your.email@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee-password">Password</Label>
                <Input
                  id="employee-password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee-confirmPassword">
                  Confirm Password
                </Label>
                <Input
                  id="employee-confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin" className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-fullName">Full Name</Label>
                <Input
                  id="admin-fullName"
                  type="text"
                  placeholder="Admin Name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@company.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-confirmPassword">Confirm Password</Label>
                <Input
                  id="admin-confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <a
            href="/login"
            className="hover:text-primary underline underline-offset-4"
          >
            Sign in
          </a>
        </div>
        <div className="text-xs text-center text-muted-foreground">
          Protected by end-to-end encryption
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegistrationForm;
