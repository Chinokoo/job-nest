import { useJobStore } from "@/store/jobStore";
import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { BarLoader } from "react-spinners";
import colors from "@/lib/constants";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";

const MyJobs = () => {
  const { recruiterJobs, loading, getRecruiterJobs } = useJobStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getRecruiterJobs(user._id);
  }, [getRecruiterJobs, user._id]);

  if (loading) {
    return <BarLoader width={"100%"} color={colors.BLUE} />;
  }

  if (recruiterJobs.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center gap-5">
          <h1>You haven't created any job yet.</h1>
          <p>Create jobs and provide the latest job opportunities.</p>
          <Link to="/create-job">
            <Button variant="outline">Create Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 mt-8">
      {recruiterJobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default MyJobs;
