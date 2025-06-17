/**
 * Header component that displays the main navigation bar
 * Includes:
 * - Logo link
 * - Theme toggle button
 * - User authentication controls (login/logout)
 * - Navigation menu for authenticated users
 */
import { Link } from "react-router-dom";
import { ModeToggle } from "./theme_button";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2 } from "lucide-react";

const Header = () => {
  // Get auth state and actions from store
  const { setLoginModal, user, logout, isLoading } = useAuthStore();

  // Get first letter of user's name for avatar
  const firstLetterOfUser = user !== null ? user?.name?.[0] : "";

  /**
   * Handles user logout
   * Calls logout function from auth store
   */
  const handleLogout = () => {
    logout();
  };

  // Check conditions for showing trash icon
  const isEmployer = user?.role === "employer";

  return (
    /* Main navigation container */
    <nav className="flex justify-between items-start px-2 py-4">
      {/* Logo link */}
      <Link>
        <img src="/logo.png" className={"size-15"} alt="logo" />
      </Link>

      {/* Right side controls */}
      <div className="flex flex-row gap-5">
        {/* Theme toggle */}
        <ModeToggle />

        {/* Auth controls */}
        <div className="flex gap-8">
          {/* If user is authenticated, show profile popover */}
          {user ? (
            <Popover>
              {/* User avatar trigger */}
              <PopoverTrigger className="flex justify-center items-center bg-[#57A656] px-3 pb-2 rounded-full text-white text-lg">
                {firstLetterOfUser}
              </PopoverTrigger>

              {/* Profile dropdown content */}
              <PopoverContent className={"flex flex-col gap-2 mr-5 shadow-md"}>
                {/* Navigation links */}
                {isEmployer && (
                  <Link
                    className={`hover:bg-[#57A656] px-3 py-2 rounded-md hover:text-white`}
                    to="/create-job"
                  >
                    Create Job
                  </Link>
                )}
                <Link
                  className={`hover:bg-[#57A656] px-3 py-2 rounded-md hover:text-white`}
                  to="/all-jobs"
                >
                  All Jobs
                </Link>
                <Link
                  className={`hover:bg-[#57A656] px-3 py-2 rounded-md hover:text-white`}
                  to="/my-jobs"
                >
                  My Jobs
                </Link>
                <Link
                  className={`hover:bg-[#57A656] px-3 py-2 rounded-md hover:text-white`}
                  to="/saved-jobs"
                >
                  Saved Jobs
                </Link>

                {/* Logout button */}
                <Button
                  onClick={() => handleLogout()}
                  disabled={isLoading}
                  className={
                    "bg-red-700 hover:bg-red-500 text-white px-3 py-2 rounded-md disabled:opacity-50"
                  }
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button onClick={() => setLoginModal()} variant="outline">
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
