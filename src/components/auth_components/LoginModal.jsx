import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ setWhereModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    // navigate("/onboarding");
    if (user == " ") {
      navigate("/onboarding");
    }
    if (user == "candidate") {
      navigate("/all-jobs");
    }
    if (user == "employer") {
      navigate("/create-job");
    }
  };

  return (
    <div>
      <div className="mb-5 p-4 border border-gray-200 rounded-lg">
        <h4 className="mb-3 font-medium text-gray-800 text-red-500">
          Important Notice for Demo Users
        </h4>
        <p className="mb-2 text-gray-300">
          Mailtrap Security: email verification won't work to create a new
          account. i can't send emails to users unless i have a registered
          domain.
        </p>
        <div className="bg-black mb-3 p-3 rounded-md text-white">
          <p className="my-1 font-medium">
            so to access the site, use this demo employer account credentials:
          </p>
          <p className="my-1 font-medium">Email: peterchinokoo@gmail.com</p>
          <p className="my-1 font-medium">Password: 12345678</p>
        </div>
        <p className="text-gray-300 text-sm">
          Note: This demo account has full employer functionality for testing
          purposes.
        </p>
      </div>
      <h1 className="mb-5 font-bold text-[#1a6ba4] text-3xl text-center">
        Log In Here
      </h1>
      {isLoading && <BarLoader className="w-full" />}
      <form onSubmit={handleSubmit} className="space-y-5 px-2">
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            "mb-7 text-white focus:border-[#1a6ba4] focus:ring-2 focus:ring-[#1a6ba4]"
          }
        />
        <div className="flex justify-center items-center gap-3 mb-7">
          <button
            type="button"
            className="text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              " text-white focus:border-[#1a6ba4] focus:ring-2 focus:ring-[#1a6ba4]"
            }
          />
        </div>

        <button
          onClick={() => setWhereModal("forgotpassword")}
          className="text-white hover:text-[#59ae56] cursor-pointer"
        >
          forgot password ?
        </button>

        <button
          type="submit"
          className="bg-[#59ae56] py-3 rounded-md w-full font-weight500 text-white text-lg"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "login"}
        </button>
        {error && <p className="font-semibold text-red-500 text-sm">{error}</p>}
      </form>
      <div className="flex justify-center items-center gap-3 py-5 text-white hover:text-[#59ae56]">
        <p>Don&apos;t have an account ?</p>
        <button
          onClick={() => setWhereModal("signup")}
          className="font-bold text-[#1a6ba4] hover:text-blue-500 cursor-pointer"
        >
          register
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
