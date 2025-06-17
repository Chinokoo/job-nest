import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginModal from "./LoginModal";
import VerifyEmail from "./VerifyEmail";
import ForgotPassword from "./ForgotPassword";

const AuthModal = () => {
  const [whereModal, setWhereModal] = useState("login");

  if (whereModal === "login") {
    return <LoginModal setWhereModal={setWhereModal} />;
  }
  if (whereModal === "signup") {
    return <SignUpForm setWhereModal={setWhereModal} />;
  }
  if (whereModal === "verifyemail") {
    return <VerifyEmail />;
  }
  if (whereModal === "forgotpassword") {
    return <ForgotPassword />;
  }
};

export default AuthModal;
