import { Check, X } from "lucide-react";
import React from "react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /\d/.test(password) },
    {
      label: "Contains special character",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
  ];

  return (
    <div className="mt-2 space-y-1">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-xs">
          {item.met ? (
            <Check className="size-4 text-[#59ae56] mr-2" />
          ) : (
            <X className="size-4 text-[#e54949] mr-2" />
          )}
          <span className={item.met ? "text-[#59ae56]" : "text-[#e54949]"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) strength++;
    return strength;
  };

  const getColor = (strength) => {
    if (strength === 0) return "bg-[#e54949]";
    if (strength === 1) return "bg-[#B86161FF]";
    if (strength === 2) return "bg-[#85C580FF]";
    if (strength === 3) return "bg-[#59ae56]";
    if (strength === 4) return "bg-[#59ae56]";
    return "bg-[#59ae56]";
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength == 0) return "Very Weak";
    if (strength == 1) return "Weak";
    if (strength == 2) return "Fair";
    if (strength == 3) return "Good";
    if (strength == 4) return "Excellent";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-[#59ae56]">Password Strength</span>
        <span className="ml-2 text-sm text-[#59ae56]">
          {getStrengthText(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full ${
              index < strength ? getColor(strength) : "bg-white"
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
