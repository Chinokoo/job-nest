import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import colors from "@/lib/constants";
import { useSavedJobsStore } from "@/store/savedJobsStore";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

const SavedJobsPage = () => {
  const { savedJobs, loading, getSavedJobs } = useSavedJobsStore();

  useEffect(() => {
    getSavedJobs();
  }, [getSavedJobs]);

  return (
    <div>
      <h1 className="pb-8 font-extrabold font-extrabold text-[#1A6CA5] text-6xl sm:text-7xl text-center">
        Saved Jobs
      </h1>
      {loading && <BarLoader width={"100%"} color={colors.BLUE} />}

      {savedJobs.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
          <div>You have not saved jobs yet.</div>
          <Link to="/all-jobs">
            <Button variant="outline">Browse Jobs</Button>
          </Link>
        </div>
      ) : (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          {savedJobs?.map((savedJob) => (
            // Pass the full job object if available, otherwise use job_id
            <JobCard key={savedJob._id} job={savedJob.job_id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobsPage;
