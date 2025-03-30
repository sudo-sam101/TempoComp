import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface HomeProps {
  isAuthenticated?: boolean;
}

const Home = ({ isAuthenticated = false }: HomeProps) => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false);
  const { user, userRole } = useAuth();

  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      // Redirect to appropriate dashboard based on user role
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    }
  }, [user, userRole, navigate]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Features list
  const features = [
    {
      title: "Policy Management",
      description:
        "Create, edit, and assign policies to ensure organizational compliance",
      icon: <CheckCircle className="h-5 w-5 text-primary" />,
    },
    {
      title: "Compliance Tracking",
      description:
        "Monitor deadlines and compliance status across your organization",
      icon: <Shield className="h-5 w-5 text-primary" />,
    },
    {
      title: "Secure Whistleblowing",
      description: "Anonymous reporting system with end-to-end encryption",
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:24px_24px] opacity-25 pointer-events-none" />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Hero section */}
        <motion.div
          className="flex-1 flex flex-col justify-center pr-0 lg:pr-12 py-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold ml-3 text-primary">
              ComplianceGuard
            </h1>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simplify Regulatory <span className="text-primary">Compliance</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8">
            A comprehensive platform to manage policies, track compliance, and
            handle whistleblowing with security and ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate("/register")}
            >
              Create Account
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFeatures(!showFeatures)}
            >
              {showFeatures ? "Hide Features" : "Explore Features"}
            </Button>
          </div>

          {/* Features section - conditionally shown */}
          {showFeatures && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card shadow-sm border-border">
                    <CardContent className="p-6">
                      <div className="mb-4">{feature.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Organizations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Support</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          className="flex-1 flex items-center justify-center py-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AuthLayout>
            <LoginForm />
          </AuthLayout>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
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
      </footer>
    </div>
  );
};

export default Home;
