/**
 * CreateJobPage component - Form for creating new job postings
 * Features:
 * - Form with multiple fields (title, description, location, company, requirements)
 * - Field validation and error handling
 * - Integration with company selection
 * - Markdown editor for job requirements
 * - Form submission handling with loading state
 */
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import { useCompanyStore } from "@/store/companyStore";
import CreateCompany from "@/components/CreateCompany";
import { useJobStore } from "@/store/jobStore";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { City } from "country-state-city";

const CreateJobPage = () => {
  // Form state management
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");

  // Get companies data and actions from store
  const { companies, getCompanies } = useCompanyStore();

  // Get job creation function and loading state
  const { createJob, loading } = useJobStore();

  // Navigation hook for redirects
  const navigate = useNavigate();

  // Fetch companies on component mount
  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  /**
   * Handles form submission
   * Validates required fields before submission
   * Creates job via API and navigates to job listings on success
   * Shows error toast on validation failure or API error
   */
  const handleSubmit = async (e) => {
    e.preventDefault(e);

    // Field validation
    if (!title) {
      return toast.error("Please enter a job title");
    }
    if (!description) {
      return toast.error("Please enter a job description");
    }
    if (!location) {
      return toast.error("Please enter a job location");
    }
    if (!company) {
      return toast.error("Please enter a company name");
    }

    try {
      // Submit job data to API
      await createJob({
        title,
        description,
        location,
        company,
        requirements,
      });

      // Redirect to job listings on success
      navigate("/all-jobs");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    /* Main form container */
    <div>
      {/* Form header */}
      <h1 className="text-shadow-lg pb-8 font-extrabold text-[#1a6ba4] text-5xl sm:text-7xl text-center">
        Create a Job
      </h1>

      {/* Main form */}
      <form onSubmit={handleSubmit} className="space-y-4 px-2">
        {/* Job title input */}
        <Input
          placeholder="Job Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Job description textarea */}
        <Textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Location and company selection row */}
        <div className="flex space-x-4 w-full">
          <div className="flex md:flex-row flex-col items-start md:items-end gap-5 w-full">
            {/* Location select dropdown */}
            <div className="">
              <label
                htmlFor="location"
                className="block font-medium text-gray-700 text-sm"
              >
                Location
              </label>
              <Select
                value={location}
                onValueChange={(value) => setLocation(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {City.getCitiesOfCountry("ZA").map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Company select dropdown */}
            <div>
              <label
                htmlFor="company"
                className="block font-medium text-gray-700 text-sm"
              >
                Company
              </label>

              <Select
                value={company}
                onValueChange={(value) => setCompany(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {!Array.isArray(companies) || companies.length == 0 ? (
                    <p className="px-4 py-2 text-center">
                      no companies available
                    </p>
                  ) : (
                    companies.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Add company button */}
            <CreateCompany />
          </div>
        </div>

        {/* Requirements markdown editor */}
        <div className="mt-5">
          <label
            htmlFor="requirements"
            className="pb-5 font-medium text-gray-700 text-sm md:text-lg"
          >
            Enter Your Requirements
          </label>

          <MDEditor
            value={requirements}
            onChange={(value) => setRequirements(value)}
          />
        </div>

        {/* Submit button with loading state */}
        <div>
          {loading && (
            <BarLoader color="#57A656" loading={loading} width={"100%"} />
          )}
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#57A656] hover:bg-green-800 w-full font-semibold text-white"
          >
            {loading ? "creating job..." : "Create Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage;
