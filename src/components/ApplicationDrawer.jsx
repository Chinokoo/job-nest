import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useApplicationStore } from "@/store/applicationStore";
import { BarLoader } from "react-spinners";
import colors from "@/lib/constants";
import { useNavigate } from "react-router-dom";

export function ApplicationDialog({ job }) {
  const { user } = useAuthStore();
  const [name, setName] = useState(user?.name || "");
  const [experience, setExperience] = useState(1);
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [level, setLevel] = useState("beginner");
  const { loading, createApplication } = useApplicationStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(resume.type)) {
      alert("Please upload a PDF, DOC or DOCX file");
      return;
    }

    // Validate file size (2MB max)
    if (resume.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit");
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("experience", experience);
    formData.append("education", education);
    formData.append("skills", skills);
    formData.append("level", level);
    formData.append("resume", resume);
    formData.append("job_id", job._id);

    createApplication(formData);
    navigate(`/job-details/${job._id}`);

    setName(user?.name);
    setExperience(1);
    setEducation("");
    setSkills("");
    setLevel("beginner");
    setResume(null);
  };

  return (
    <Dialog className="mt-5 overflow-y-scroll">
      <DialogTrigger className="bg-[#57A656] hover:bg-green-800 px-5 py-2 rounded-md w-full text-white">
        Apply Now
      </DialogTrigger>
      <DialogContent className="rounded-sm sm:max-w-[425px] max-h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{job?.title} Job Application</DialogTitle>
          <DialogDescription>
            Fill in your details to apply for this position.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="gap-4 grid py-4">
            <div className="gap-3 grid">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="gap-3 grid">
              <Label htmlFor="experience">Experience</Label>
              <Input
                type="number"
                id="experience"
                name="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Enter your years of experience"
                min="1"
              />
            </div>
            <div className="gap-3 grid">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                name="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="List your educational qualifications"
                rows={3}
              />
            </div>
            <div className="gap-3 grid">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="List your relevant skills"
                rows={3}
              />
            </div>
            <div className="gap-3 grid">
              <Label>Experience Level</Label>
              <RadioGroup
                value={level}
                onValueChange={setLevel}
                className="gap-3 grid-cols-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert">Expert</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="post-graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="gap-3 grid">
              <Label htmlFor="resume">
                Resume{" "}
                <span className="text-red-500 text-xs">
                  Should be less than 2mb in size. must be in pdf, doc or docx
                  format.
                </span>
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="file:text-gray-600 file:cursor-pointer"
              />
              {loading && <BarLoader width={"100%"} color={colors.BLUE} />}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              className={"bg-[#57A656] text-white hover:bg-green-800"}
            >
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
