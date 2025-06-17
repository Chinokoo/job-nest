/**
 * CreateCompany component - Dialog for adding new companies
 * Features:
 * - Form with company name and logo upload
 * - Image size validation (max 500KB)
 * - Image preview functionality
 * - Loading state during submission
 * - Integration with company store
 */
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCompanyStore } from "@/store/companyStore";
import { BarLoader } from "react-spinners";

const CreateCompany = () => {
  // Refs and state management
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  
  // Get company creation function and loading state from store
  const { createCompany, loading } = useCompanyStore();

  /**
   * Handles image file selection and validation
   * Validates file size (max 500KB)
   * Reads file and sets image preview
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image size (max 500KB)
      if (file.size > 500 * 1024) {
        toast.error("Image size must be less than 500KB");
        return;
      }

      // Read file and set preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles form submission
   * Calls createCompany with form data
   * Resets form fields after submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    createCompany({ name, image });
    setName("");
    setImage(null);
  };

  return (
    /* Dialog component for company creation */
    <Dialog>
      {/* Dialog trigger button */}
      <DialogTrigger className="flex-1 bg-[#1a6ba4] hover:bg-blue-800 mx-5 py-2 rounded-md w-full text-white">
        Add Company
      </DialogTrigger>
      
      {/* Dialog content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Company</DialogTitle>
          <DialogDescription>
            if Company doesn&apos;t exist in the list, you can add it here.
          </DialogDescription>
          
          {/* Form content */}
          <div className="gap-4 grid">
            {/* Company name input */}
            <div className="gap-3 grid">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            {/* Logo upload section */}
            <div className="gap-3 grid">
              <div className="flex items-center mt-1">
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => fileInputRef.current.click()}
                  className="inline-flex items-center bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border-gray-300 rounded-md font-medium text-[#1a6ba4] text-sm"
                >
                  Upload Company Logo
                </Button>
                {/* Hidden file input */}
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              
              {/* Image preview */}
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="company logo"
                    className="rounded-md w-48 h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            {/* Loading indicator */}
            {loading && (
              <div className="w-full">
                <BarLoader color={"#1a6ba4"} loading={loading} width={"100%"} />
              </div>
            )}
          </div>
          
          {/* Dialog footer with action buttons */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#1a6ba4] hover:bg-blue-800 text-white"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Add Company"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompany;
