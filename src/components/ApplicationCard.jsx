import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Download } from "lucide-react";
import colors from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useApplicationStore } from "@/store/applicationStore";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application }) => {
  const [status, setStatus] = useState(application?.status);
  const { updateApplication, loading } = useApplicationStore();

  const handleApplicationStatusUpdate = (id, status) => {
    updateApplication(id, status);
  };

  console.log(application);

  return (
    <Card className={"my-4"}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            {application?.candidate_id?.name} applied for{" "}
            {application?.job_id?.title} at{" "}
            {application?.job_id?.company_id?.name}
          </span>
          <a
            className="bg-white p-3 rounded-full cursor-pointer"
            href={application?.resume}
            target="_blank"
          >
            <Download size={16} color={colors.BLUE} />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex md:flex-row flex-col gap-4">
          <div className="flex items-center gap-2">
            <p>
              {" "}
              <strong>Experience :</strong> {application?.experience}{" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              {" "}
              <strong>Experience Level :</strong> {application?.level}{" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              {" "}
              <strong>Education :</strong> {application?.education}{" "}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p>
              {" "}
              <strong>Skills :</strong> {application?.skills}{" "}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span>
          {new Date(application?.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </span>
        <span className="flex justify-center items-center gap-2">
          <strong>Status: </strong>
          <Select
            value={status}
            onValueChange={(value) => {
              const newStatus = value;
              setStatus(newStatus);
              handleApplicationStatusUpdate(application?._id, newStatus);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </CardFooter>
      {loading && <BarLoader color={colors.BLUE} width={"100%"} />}
    </Card>
  );
};

export default ApplicationCard;
