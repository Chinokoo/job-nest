import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, error, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="p-8">
      <h2 className="mb-6 font-bold text-white text-3xl text-center">
        Forgot Password
      </h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <p className="mb-4 text-white text-center">
            Enter your Email address and we will send a link to reset your
            password.
          </p>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="bg-[#59ae56] hover:bg-green-800 mt-5 px-4 py-3 rounded-2xl w-full"
            type="submit"
          >
            {isLoading ? (
              <Loader className="mx-auto size-6 animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="flex justify-center items-center mx-auto mb-4 rounded-full size-16">
            <Mail className="size-8 text-white" />
          </div>
          <p className="mb-4 text-center">
            If your account exists for {email}, we have sent a link to reset
            your password. Please check your email and follow the instructions.
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
