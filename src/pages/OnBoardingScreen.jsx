import { useAuthStore } from "@/store/authStore";
import { Button } from "../components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnBoardingScreen = () => {
  const [role, setRole] = useState(" ");
  const navigate = useNavigate();

  const { user, updateUser } = useAuthStore();

  const handleCandidateRole = (role) => {
    if (user.role === " ") {
      setRole(role);
      updateUser(role);
      navigate("/all-jobs");
    } else {
      navigate("/all-jobs");
    }
  };

  const handleEmployerRole = (role) => {
    if (user.role === " ") {
      setRole(role);
      updateUser(role);
      navigate("/create-job");
    } else {
      navigate("/create-job");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-32">
      <h2 className="font-extrabold text-7xl sm:text-8xl text-center tracking-tighter gradient gradient-title">
        Are You a . . .
      </h2>
      <div className="flex md:flex-row flex-col justify-center gap-4 mt-16 px-4 md:px-40 w-full">
        <Button
          onClick={() => {
            handleCandidateRole("candidate");
          }}
          disabled={user.role === "employer"}
          className="bg-[#1A6CA5] hover:bg-blue-500 w-full md:w-sm h-36 text-white text-2xl"
        >
          Job Seeker
        </Button>
        <Button
          disabled={user.role === "candidate"}
          onClick={() => {
            handleEmployerRole("employer");
          }}
          className="bg-[#57A656] hover:bg-green-700 w-full md:w-sm h-36 text-white text-2xl"
        >
          Employer
        </Button>
      </div>
    </div>
  );
};

export default OnBoardingScreen;
