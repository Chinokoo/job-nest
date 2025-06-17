import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { ArrowLeft, Eye, EyeClosed, Loader } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { resetPassword, error, isLoading } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, Login with your new password ..."
      );
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error Resetting the password ");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#59ae56] rounded-md w-full h-screen">
      <div className="bg-[#1A6CA5] rounded-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h2 className="mb-6 font-bold text-white text-3xl text-center">
            Reset Password
          </h2>
          {error && <p className="text-red-500 text-sm text-left">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-5">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </button>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="placeholder:text-white"
              />
            </div>
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="placeholder:text-white"
            />
            <button
              className="bg-[#59ae56] hover:bg-green-800 mt-5 px-4 py-3 rounded-2xl w-full text-white"
              type="submit"
            >
              {isLoading ? (
                <Loader className="mx-auto size-6 animate-spin" />
              ) : (
                "Set New Password"
              )}
            </button>
          </form>
          <Link to="/" className="group flex justify-center items-center mt-5">
            <ArrowLeft className="size-5 group-hover:text-green-500" />
            <span className="group-hover:text-green-500">
              Back to HomePage{" "}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
