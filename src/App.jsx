/**
 * Main App component - Root of the application
 * Responsibilities:
 * - Sets up application routing
 * - Manages authentication state
 * - Provides theme context
 * - Handles initial loading state
 * - Renders toast notifications
 */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/Applayout";
import LandingPage from "./pages/LandingPage";
import OnBoardingScreen from "./pages/OnBoardingScreen";
import JobListingsPage from "./pages/JobListingsPage";
import JobDetailsPage from "./pages/JobDetails";
import CreateJobPage from "./pages/CreateJobPage";
import MyJobsPage from "./pages/MyJobsPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import { ThemeProvider } from "./utils/theme_provider";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { BounceLoader } from "react-spinners";
import { useEffect } from "react";
import ResetPassword from "./pages/ResetPassword";

function App() {
  // Get auth state and actions from store
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Application routes configuration
   * - Protected routes redirect to landing page if user is not authenticated
   * - Public routes redirect to onboarding if user is authenticated
   */
  const router = createBrowserRouter([
    {
      // Main layout wrapper for all routes
      element: <AppLayout />,
      children: [
        // Landing page (public)
        {
          path: "/",
          element: !user ? <LandingPage /> : <Navigate to="/onboarding" />,
        },
        // Onboarding screen (protected)
        {
          path: "/onboarding",
          element: user ? <OnBoardingScreen /> : <Navigate to="/" />,
        },
        // Job listings (protected)
        {
          path: "/all-jobs",
          element: user ? <JobListingsPage /> : <Navigate to="/" />,
        },
        // Job details (protected)
        {
          path: "/job-details/:id",
          element: user ? <JobDetailsPage /> : <Navigate to="/" />,
        },
        // Create job (protected)
        {
          path: "/create-job",
          element: user ? <CreateJobPage /> : <Navigate to="/" />,
        },
        // My jobs (protected)
        {
          path: "/my-jobs",
          element: user ? <MyJobsPage /> : <Navigate to="/" />,
        },
        // Saved jobs (protected)
        {
          path: "/saved-jobs",
          element: user ? <SavedJobsPage /> : <Navigate to="/" />,
        },
        // Password reset (public)
        {
          path: "/reset-password/:token",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  // Show loading screen while checking auth status
  if (isCheckingAuth)
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <BounceLoader size={200} color="#1a6ba4" />
          <p className="mt-2 text-[#1a6ba4] text-lg">
            Job Nest is Loading . . .
          </p>
        </div>
      </div>
    );

  // Main application render with theme provider and router
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
