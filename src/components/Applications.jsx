import colors from "@/lib/constants";
import { useApplicationStore } from "@/store/applicationStore";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./ApplicationCard";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MyJobApplications = () => {
  const { candidateApplications, loading, getCandidateApplications } =
    useApplicationStore();

  useEffect(() => {
    getCandidateApplications();
  }, [getCandidateApplications]);

  if (loading) {
    return <BarLoader color={colors.BLUE} width={"100%"} />;
  }

  if (candidateApplications.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-col items-center gap-2">
          <h1>You haven't applied to any job yet.</h1>
          <p>Apply to jobs to get the latest job opportunities.</p>
          <Link to="/all-jobs">
            <Button variant="outline">Browse Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {candidateApplications.map((application) => (
        <ApplicationCard key={application._id} application={application} />
      ))}
    </div>
  );
};

export default MyJobApplications;
