import MyJobApplications from "@/components/Applications";
import MyJobs from "@/components/MyJobs";
import { useAuthStore } from "@/store/authStore";
import React from "react";

const MyJobsPage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <h1 className="pb-8 font-extrabold text-[#1A6CA5] text-5xl sm:text-7xl text-center">
        {user.role === "employer" ? "My Jobs" : "My Applications"}
      </h1>
      {user.role === "employer" ? <MyJobs /> : <MyJobApplications />}
    </div>
  );
};

export default MyJobsPage;
