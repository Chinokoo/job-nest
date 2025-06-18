import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useAuthStore } from "@/store/authStore";
import { HeartIcon, MapPinIcon, TrashIcon } from "lucide-react";
import colors from "@/lib/constants";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useSavedJobsStore } from "@/store/savedJobsStore";
import { useJobStore } from "@/store/jobStore";

const JobCard = ({ job }) => {
  const { user } = useAuthStore();
  const { deleteJobById } = useJobStore();
  const { addSavedJob, deleteSavedJob, getSavedJobs, savedJobs } =
    useSavedJobsStore();

  console.log(savedJobs);

  // Normal toggle behavior for other pages
  const searchsavedJobs = savedJobs.some(
    (savedJob) => savedJob?.job_id._id === job._id
  );

  useEffect(() => {
    getSavedJobs();
  }, []);

  const handleDeleteJob = async () => {
    deleteJobById(job._id);
  };

  const handleToggleSavedJob = async () => {
    try {
      // If we're on SavedJobsPage, always remove the job
      if (window.location.pathname.includes("/saved-jobs")) {
        await deleteSavedJob(job._id);
      } else if (searchsavedJobs) {
        await deleteSavedJob(job._id);
      } else {
        await addSavedJob(job._id);
      }
      // Force UI update
      getSavedJobs();
    } catch (error) {
      console.error("Error toggling saved job:", error);
    }
  };
  // Check conditions for showing trash icon
  const isEmployer = user?.role === "employer";
  const isRecruiter = user?._id === job?.recruiter_id?._id;
  const showTrashIcon = isEmployer && isRecruiter;

  return (
    <Card className={"flex justify-end"}>
      <CardHeader>
        <CardTitle className={"flex justify-between font-bold"}>
          {job.title}{" "}
          {showTrashIcon && (
            <Button variant="ghost" onClick={handleDeleteJob}>
              <TrashIcon
                className="size-5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                aria-label="Delete job"
                title="Delete job"
              />
            </Button>
          )}
        </CardTitle>
        <CardContent className={"px-0"}>
          <div className="flex justify-between">
            {job.company_id && (
              <img
                src={job.company_id.logo_url}
                className="rounded-md size-20"
              />
            )}
            <div className="flex items-center gap-2">
              <MapPinIcon className={`text-[${colors.BLUE}]`} /> {job?.location}
            </div>
          </div>
          <hr />
          <p className="my-2 overflow-hidden text-gray-500 text-ellipsis line-clamp-1">
            {job.description}
          </p>
        </CardContent>
        <CardFooter className={"flex gap-2 px-0"}>
          <Link to={`/job-details/${job._id}`} className={`flex-1 `}>
            <Button
              className={`w-full text-white bg-[${colors.GREEN}] hover:bg-green-800`}
            >
              More Details
            </Button>
          </Link>
          <button
            onClick={handleToggleSavedJob}
            className="bg-transparent border-none"
          >
            <HeartIcon
              stroke={"red"}
              fill={searchsavedJobs ? "#ef4444" : "none"}
              className="size-5"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSavedJob();
              }}
            />
          </button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default JobCard;
