/**
 * JobListingsPage component displays a list of available jobs
 * Features:
 * - Fetches jobs from API on mount
 * - Shows loading state while fetching
 * - Displays error messages if fetch fails
 * - Basic job listing display (to be enhanced)
 */
import { useEffect, useState } from "react";
import { useJobStore } from "@/store/jobStore";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/JobCard";
import colors from "@/lib/constants";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const JobListingsPage = () => {
  const [search, setSearch] = useState("");
  // Get job state and actions from store
  const {
    jobs,
    loading,
    error,
    searchedJobs,
    getSearchedJobs,
    currentPage,
    totalPages,
    getJobs,
  } = useJobStore();
  // Fetch jobs on component mount
  useEffect(() => {
    getJobs();
    getSearchedJobs();
  }, [getJobs, getSearchedJobs]);

  // handleSubmit function to search for a new job
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      toast.error("Please enter a job title or location");
    }
    getSearchedJobs(search);
  };
  // Show error message if fetch failed
  if (error) {
    return <p className="text-red-500">{error.message}</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row flex-col items-center gap-5"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Jobs by title and location"
          className="md:flex-1/3 px-3 py-2 border-[#57A656] border-2 rounded-md outline-[#57A656] outline-2 w-full"
        />
        <button
          type="submit"
          className={
            "w-full  md:w-max bg-[#1a6ba4] px-4 font-bold flex items-center justify-center gap-2 py-2 rounded-md  text-white  hover:bg-blue-900 hover:text-white"
          }
        >
          <Search /> <span>Search</span>
        </button>
      </form>
      {loading && <BarLoader width={"100%"} color={colors.BLUE} />}
      <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3 mt-8">
        {/* Map through jobs and display basic info */}
        {searchedJobs.length === 0
          ? jobs.map((job) => <JobCard key={job._id} job={job} />)
          : searchedJobs.map((job) => <JobCard key={job._id} job={job} />)}
      </div>

      {/* Pagination controls - only shown when not in search mode and multiple pages exist */}
      {searchedJobs.length === 0 && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {/* Previous page button - disabled when on first page */}
          <button
            onClick={() => getJobs(Number(currentPage) - 1)} // Convert to number to prevent string concatenation
            disabled={currentPage === 1}
            className="disabled:opacity-50 px-4 py-2 border rounded-md"
          >
            Previous
          </button>
          
          {/* Current page display - shows page number and total pages */}
          <span className="px-4 py-2">
            Page {Number(currentPage)} of {Number(totalPages)} {/* Explicit number conversion */}
          </span>
          
          {/* Next page button - disabled when on last page */}
          <button
            onClick={() => getJobs(Number(currentPage) + 1)} // Convert to number to prevent string concatenation
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 px-4 py-2 border rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
