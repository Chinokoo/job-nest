import ApplicationCard from "@/components/ApplicationCard";
import { ApplicationDialog } from "@/components/ApplicationDrawer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import colors from "@/lib/constants";
import { useApplicationStore } from "@/store/applicationStore";
import { useAuthStore } from "@/store/authStore";
import { useJobStore } from "@/store/jobStore";
import MDEditor from "@uiw/react-md-editor";
import { FileUser, MapPinIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { getJob, job, updateJobStatus, loading } = useJobStore();
  const { applications, getApplications } = useApplicationStore();
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(job?.isOpen);

  useEffect(() => {
    if (id) {
      getJob(id);
    }
  }, [getJob, id]);

  useEffect(() => {
    if (job !== undefined) {
      setIsOpen(job.isOpen);
    }
  }, [job]);

  useEffect(() => {
    getApplications(job?._id);
  }, [getApplications, job?._id]);

  const handleJobStatusUpdate = async (jobId, isOpen) => {
    try {
      if (jobId) {
        await updateJobStatus(jobId, isOpen);
      }
    } catch (error) {
      console.error("Failed to update job status:", error);
    }
  };

  return (
    <div className="px-2">
      {loading && (
        <BarLoader color={colors.GREEN} width={"100%"} loading={loading} />
      )}
      {/* Job Details */}
      <div className="flex md:flex-row flex-col-reverse justify-between items-center gap-6">
        <h1 className="pb-3 font-extrabold text-[#1a6ba4] text-4xl sm:text-6xl">
          {job?.title}
        </h1>
        <img
          className="mb-2 rounded-md size-24"
          src={job?.company_id?.logo_url}
          alt="company logo"
        />
      </div>

      {/* job location */}
      <div className="flex md:flex-row flex-col justify-between gap-2">
        <div className="flex gap-2">
          <MapPinIcon color={colors.GREEN} />
          {job?.location}
        </div>
        <div className="flex gap-2">
          <FileUser color={colors.GREEN} />
          {applications.length}
        </div>
        <div className="flex gap-2">
          {job?.isOpen ? (
            <ApplicationDialog job={job} />
          ) : (
            <p className="text-red-500">No longer Available</p>
          )}
        </div>
      </div>
      {/* hiring status */}
      {job?.recruiter_id?._id === user._id && (
        <div className="flex items-center gap-5 m-4">
          {user.role === "employer" && (
            <>
              <span>Job Status</span>
              <Select
                value={isOpen ? "hiring" : "closed"}
                onValueChange={(value) => {
                  const newStatus = value === "hiring";
                  setIsOpen(newStatus);
                  handleJobStatusUpdate(job?._id, newStatus);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Change Job Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hiring">Hiring</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
      )}

      <h2 className="font-bold text-2xl sm:text-3xl">About the Job</h2>
      <p className="text-lg sm:text-xl">{job?.description}</p>

      <h2 className="mt-6 font-bold text-2xl sm:text-3xl">Job Requirements</h2>
      <MDEditor.Markdown
        style={{ backgroundColor: "transparent", color: `${colors.GREEN}` }}
        source={job?.requirements}
        className="mb-5"
      />
      {/* render application form here */}
      <div className="flex gap-2">
        {job?.isOpen ? (
          <ApplicationDialog job={job} />
        ) : (
          <p className="text-red-500">No longer Available</p>
        )}
      </div>
      {/* TODO: add applications here */}
      {applications.length > 0 &&
        job.recruiter_id?._id === user._id &&
        user.role === "employer" && (
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl">Applications</h2>
            {applications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default JobDetailsPage;
