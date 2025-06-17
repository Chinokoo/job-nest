import { useAuthStore } from "@/store/authStore";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const { VerifyEmail, user, error } = useAuthStore();
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      // focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      // focus on the next empty input or the last filled one
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      VerifyEmail(verificationCode);
      if (user.role === " ") {
        navigate("/onboarding");
      } else if (user.role === "candidate") {
        navigate("/all-jobs");
      } else {
        navigate("/create-job");
      }
      toast.success("Email verified successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div>
      <h2 className="text-3xl text-white font-bold mb-6 text-center">
        Verify Your Email
      </h2>
      <p className="text-center text-green-500 mb-6">
        we sent you a 6 digit code here, enter here !{" "}
      </p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex mx-5 justify-between">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="6"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="size-12 text-center text-2xl font-bold bg-transparent text-white border-2 border-green-500 rounded-lg focus:border-green-800 focus:outline-none"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full hover:bg-green-500 cursor-pointer bg-green-600 text-white font-bold py-2 px-4 mb-5 rounded-lg shadow-lg focus:outline-none"
        >
          Verify Email
        </button>
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyEmail;
