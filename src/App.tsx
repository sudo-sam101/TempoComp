import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import { AuthProvider } from "./contexts/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";
import { Toaster } from "./components/ui/toaster";

// Lazy load components
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegistrationForm = lazy(
  () => import("./components/auth/RegistrationForm"),
);
const AdminDashboard = lazy(
  () => import("./components/dashboard/AdminDashboard"),
);
const EmployeeDashboard = lazy(
  () => import("./components/dashboard/EmployeeDashboard"),
);
const DashboardLayout = lazy(
  () => import("./components/layout/DashboardLayout"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <AuthGuard allowedRoles={["admin"]}>
                  <DashboardLayout userRole="admin" pageTitle="Admin Dashboard">
                    <AdminDashboard />
                  </DashboardLayout>
                </AuthGuard>
              }
            />

            {/* Employee routes */}
            <Route
              path="/employee"
              element={
                <AuthGuard allowedRoles={["employee"]}>
                  <DashboardLayout
                    userRole="employee"
                    pageTitle="Employee Dashboard"
                  >
                    <EmployeeDashboard />
                  </DashboardLayout>
                </AuthGuard>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          <Toaster />
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
