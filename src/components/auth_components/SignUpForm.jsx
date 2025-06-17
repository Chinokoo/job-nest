import React, { useState } from "react";
import { Input } from "../ui/input";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { Eye, EyeClosed, Loader } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { BarLoader } from "react-spinners";

const SignUpForm = ({ setWhereModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, isLoading, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name);
      setWhereModal("verifyemail");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-[#1a6ba4] text-3xl font-bold text-center mb-5">
        create your account
      </h1>

      {isLoading && <BarLoader color={"#1a6ba4"} width={"100%"} />}

      <form onSubmit={handleSubmit} className="space-y-11 px-2">
        <Input
          type="text"
          placeholder="Enter Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={
            "mb-7 text-white focus:border-[#1a6ba4] focus:ring-2 focus:ring-[#1a6ba4]"
          }
        />
        <Input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            "mb-7 text-white focus:border-[#1a6ba4] focus:ring-2 focus:ring-[#1a6ba4]"
          }
        />
        <div className="flex gap-3 items-center justify-center mb-7">
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
        {/* password something.... */}
        <PasswordStrengthMeter password={password} />
        <button
          type="submit"
          className="bg-[#59ae56] rounded-md py-3 w-full text-white text-lg font-weight500 "
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader
              type="Oval"
              color="white"
              className="animate-spin size-10 mx-auto"
            />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex gap-3 justify-center items-center text-white py-5 hover:text-[#59ae56]">
        <p>Already have an account ?</p>
        <button
          onClick={() => setWhereModal("login")}
          className="text-[#1a6ba4] hover:text-blue-500 cursor-pointer font-bold"
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
