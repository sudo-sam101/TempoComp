import React from "react";
import { Shield, Lock } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = ({ children = <LoginForm /> }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:24px_24px] opacity-25 pointer-events-none" />

      {/* Logo and branding */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-primary/10 p-3 rounded-full">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold ml-3 text-primary">
          ComplianceGuard
        </h1>
      </div>

      {/* Main content area */}
      <div className="w-full max-w-md relative z-10">{children}</div>

      {/* Footer */}
      <div className="mt-8 flex items-center text-sm text-muted-foreground">
        <Lock className="h-4 w-4 mr-2" />
        <span>Secure, encrypted connection</span>
      </div>

      {/* Company info */}
      <div className="mt-4 text-xs text-center text-muted-foreground">
        <p>
          © {new Date().getFullYear()} ComplianceGuard, Inc. All rights
          reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a
            href="#"
            className="hover:text-primary underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-primary underline underline-offset-4"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:text-primary underline underline-offset-4"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
